"""Builds the three paid UX templates as .xlsx files that open in Google Sheets.

Run: python3 build_paid_templates.py  (needs openpyxl)
"""

from pathlib import Path

from openpyxl import Workbook
from openpyxl.chart import BarChart, LineChart, PieChart, Reference
from openpyxl.formatting.rule import CellIsRule, ColorScaleRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).parent
NAVY = "1E3A5F"
MUTED = "4B5563"
LIGHT = "EEF2F7"
FONT = "Arial"
THIN = Side(style="thin", color="D1D5DB")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
GREEN = PatternFill("solid", fgColor="D1FAE5")
AMBER = PatternFill("solid", fgColor="FEF3C7")
RED = PatternFill("solid", fgColor="FEE2E2")
BLUE = PatternFill("solid", fgColor="DBEAFE")
GREY = PatternFill("solid", fgColor="F3F4F6")
OPEN_NOTE = (
    "نسخة مدفوعة — من تصميم جمال حسن. لفتحه في Google Sheets: ارفع الملف إلى "
    "Google Drive ثم افتحه بـ «جداول بيانات Google»، ومن «ملف» اختر "
    "«حفظ كجداول بيانات Google»."
)


def new_sheet(wb, title, heading, subtitle, first=False):
    ws = wb.active if first else wb.create_sheet()
    ws.title = title
    ws.sheet_view.rightToLeft = True
    ws.sheet_view.showGridLines = False
    ws["A1"] = heading
    ws["A1"].font = Font(name=FONT, size=16, bold=True, color="FFFFFF")
    ws["A1"].fill = PatternFill("solid", fgColor=NAVY)
    ws["A1"].alignment = Alignment(vertical="center")
    ws.row_dimensions[1].height = 30
    ws["A2"] = subtitle
    ws["A2"].font = Font(name=FONT, size=10, color=MUTED)
    return ws


def band(ws, last_col):
    for col in range(2, last_col + 1):
        ws.cell(row=1, column=col).fill = PatternFill("solid", fgColor=NAVY)


def header(ws, row, labels, widths=None):
    for i, label in enumerate(labels, start=1):
        c = ws.cell(row=row, column=i, value=label)
        c.font = Font(name=FONT, bold=True, color="FFFFFF")
        c.fill = PatternFill("solid", fgColor=NAVY)
        c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        c.border = BORDER
    ws.row_dimensions[row].height = 32
    if widths:
        for i, w in enumerate(widths, start=1):
            ws.column_dimensions[ws.cell(row=1, column=i).column_letter].width = w
    band(ws, len(labels))


def grid(ws, first_row, last_row, cols, fill_from=1):
    for r in range(first_row, last_row + 1):
        for col in range(1, cols + 1):
            c = ws.cell(row=r, column=col)
            c.border = BORDER
            c.font = Font(name=FONT, size=10, bold=c.font.b)
            c.alignment = Alignment(vertical="center", wrap_text=True)
            if col < fill_from:
                c.fill = PatternFill("solid", fgColor=LIGHT)


def formula_fill(ws, col, first_row, last_row):
    for r in range(first_row, last_row + 1):
        ws.cell(row=r, column=col).fill = PatternFill("solid", fgColor=LIGHT)


def list_validation(ws, rng, values=None, source=None):
    formula = source if source else '"' + ",".join(values) + '"'
    dv = DataValidation(type="list", formula1=formula, allow_blank=True)
    dv.error = "اختر قيمة من القائمة."
    ws.add_data_validation(dv)
    dv.add(rng)


def number_validation(ws, rng, low, high):
    dv = DataValidation(type="whole", operator="between", formula1=str(low), formula2=str(high), allow_blank=True)
    dv.error = f"أدخل رقمًا صحيحًا من {low} إلى {high}."
    ws.add_data_validation(dv)
    dv.add(rng)


def text_rules(ws, rng, mapping):
    first = rng.split(":")[0]
    for text, fill in mapping.items():
        ws.conditional_formatting.add(rng, FormulaRule(formula=[f'{first}="{text}"'], fill=fill))


def kpi(ws, row, label, formula, fmt=None):
    a = ws.cell(row=row, column=1, value=label)
    b = ws.cell(row=row, column=2, value=formula)
    a.font = Font(name=FONT, bold=True)
    b.font = Font(name=FONT, size=14, bold=True, color=NAVY)
    a.fill = b.fill = PatternFill("solid", fgColor=LIGHT)
    a.border = b.border = BORDER
    b.alignment = Alignment(horizontal="center")
    if fmt:
        b.number_format = fmt


def table_head(ws, row, cols):
    for col, label in cols:
        c = ws.cell(row=row, column=col, value=label)
        c.font = Font(name=FONT, bold=True, color="FFFFFF")
        c.fill = PatternFill("solid", fgColor=NAVY)
        c.alignment = Alignment(horizontal="center")


def start_sheet(wb, heading, subtitle, steps, sheets):
    ws = new_sheet(wb, "ابدأ هنا", heading, subtitle, first=True)
    band(ws, 3)
    ws.column_dimensions["A"].width = 4
    ws.column_dimensions["B"].width = 30
    ws.column_dimensions["C"].width = 80
    ws["B4"] = "النسخة"
    ws["B4"].font = Font(name=FONT, bold=True)
    ws["C4"] = OPEN_NOTE
    row = 6
    sections = (
        ("خطوات الاستخدام", [(f"الخطوة {i}", s) for i, s in enumerate(steps, 1)]),
        ("أوراق الملف", sheets),
    )
    for title, items in sections:
        ws.cell(row=row, column=2, value=title).font = Font(name=FONT, size=12, bold=True, color=NAVY)
        row += 1
        for name, text in items:
            ws.cell(row=row, column=2, value=name).font = Font(name=FONT, bold=True)
            ws.cell(row=row, column=3, value=text)
            row += 1
        row += 1
    ws.cell(row=row, column=2, value="ألوان الخلايا").font = Font(name=FONT, size=12, bold=True, color=NAVY)
    ws.cell(row=row + 1, column=2, value="خلفية بيضاء")
    ws.cell(row=row + 1, column=3, value="خلايا تكتب فيها بياناتك.")
    ws.cell(row=row + 2, column=2, value="خلفية رمادية مزرقة").fill = PatternFill("solid", fgColor=LIGHT)
    ws.cell(row=row + 2, column=3, value="معادلات تُحسب تلقائيًا: لا تكتب فيها.")
    for r in ws.iter_rows(min_row=4, max_row=row + 2, min_col=3, max_col=3):
        for c in r:
            c.alignment = Alignment(wrap_text=True, vertical="top")
            c.font = Font(name=FONT, size=10)


# ---------------------------------------------------------------- research repository


def build_research_repository():
    wb = Workbook()
    methods = ["مقابلة", "اختبار قابلية الاستخدام", "استبيان", "دراسة ميدانية", "تحليل بيانات", "دراسة يوميات"]
    start_sheet(
        wb,
        "مستودع أبحاث المستخدمين",
        "ذاكرة بحثية واحدة للفريق: دراسات وملاحظات موسومة ورؤى مدعومة بأدلة معدودة.",
        [
            "سجّل كل دراسة برمز فريد (S01، S02…) في «الدراسات».",
            "عرّف وسومًا موحدة في «الوسوم» قبل إدخال الملاحظات، حتى لا يكتب كل باحث الوسم بطريقته.",
            "أدخل كل اقتباس أو سلوك مرصود في «الملاحظات» مع الدراسة والوسم والمشاعر.",
            "اكتب الرؤى في «الرؤى» واربط كل رؤية بوسم: يُحسب عدد الأدلة والدراسات وقوة الدليل والأولوية تلقائيًا.",
            "راجع «لوحة المتابعة» لأكثر الموضوعات تكرارًا ونسبة الملاحظات السلبية.",
        ],
        [
            ("لوحة المتابعة", "مؤشرات المستودع ورسما الوسوم والمنهجيات."),
            ("الدراسات", "كل دراسة بمنهجيتها وتاريخها والباحث وعدد ملاحظاتها."),
            ("الوسوم", "التصنيف الموحد مع عدد مرات كل وسم ونسبة الملاحظات السلبية."),
            ("الملاحظات", "الاقتباسات والسلوك المرصود."),
            ("الرؤى", "رؤى مدعومة بالأدلة مع الأولوية والحالة."),
            ("قوة الدليل", "قوي: 5 أدلة فأكثر من دراستين على الأقل. متوسط: 3 أدلة فأكثر. ضعيف: أقل من ذلك."),
        ],
    )
    dash = new_sheet(wb, "لوحة المتابعة", "لوحة متابعة المستودع", "تتحدث تلقائيًا من بقية الأوراق.")

    st = new_sheet(wb, "الدراسات", "الدراسات", "رمز فريد لكل دراسة، تستخدمه في ورقة «الملاحظات».")
    header(st, 4, ["الرمز", "عنوان الدراسة", "المنهجية", "التاريخ", "الباحث", "عدد المشاركين", "عدد الملاحظات"], [10, 40, 24, 14, 18, 14, 14])
    studies = [
        ("S01", "مقابلات العملاء الجدد عن التسجيل", "مقابلة", "2026-01-12", "سارة", 8),
        ("S02", "اختبار مسار الدفع", "اختبار قابلية الاستخدام", "2026-02-03", "أحمد", 6),
        ("S03", "استبيان رضا المستخدمين الربعي", "استبيان", "2026-03-01", "سارة", 240),
        ("S04", "يوميات استخدام التطبيق لأسبوعين", "دراسة يوميات", "2026-03-20", "منى", 10),
    ]
    S_FIRST, S_LAST = 5, 104
    N_FIRST, N_LAST = 5, 1004
    T_FIRST, T_LAST = 5, 54
    I_FIRST, I_LAST = 5, 104
    for i, row in enumerate(studies):
        for j, v in enumerate(row, start=1):
            st.cell(row=S_FIRST + i, column=j, value=v)
    for r in range(S_FIRST, S_LAST + 1):
        st.cell(row=r, column=7, value=f'=IF(A{r}="","",COUNTIF(الملاحظات!$B$5:$B$1004,A{r}))')
    grid(st, S_FIRST, S_LAST, 7)
    formula_fill(st, 7, S_FIRST, S_LAST)
    list_validation(st, f"C{S_FIRST}:C{S_LAST}", source=f"=قوائم!$A$2:$A${1 + len(methods)}")
    st.freeze_panes = "A5"

    tg = new_sheet(wb, "الوسوم", "الوسوم", "اسم الوسم كما سيُختار في «الملاحظات» و«الرؤى».")
    header(tg, 4, ["الوسم", "الوصف", "عدد الملاحظات", "نسبة السلبية"], [26, 50, 16, 16])
    tags = [
        ("صعوبة التسجيل", "عوائق إنشاء الحساب وتأكيده"),
        ("ثقة الدفع", "مخاوف الأمان والرسوم المخفية عند الدفع"),
        ("الأداء", "بطء التحميل والتجمد"),
        ("التنقل", "صعوبة الوصول إلى الصفحات والإعدادات"),
        ("الإشعارات", "كثرة الإشعارات أو عدم وضوحها"),
        ("وضوح الأسعار", "فهم الباقات والفروق بينها"),
    ]
    for i, (t, d) in enumerate(tags):
        tg.cell(row=T_FIRST + i, column=1, value=t)
        tg.cell(row=T_FIRST + i, column=2, value=d)
    for r in range(T_FIRST, T_LAST + 1):
        tg.cell(row=r, column=3, value=f'=IF(A{r}="","",COUNTIF(الملاحظات!$D$5:$D$1004,A{r}))')
        tg.cell(row=r, column=4, value=f'=IF(OR(A{r}="",C{r}=0),"",COUNTIFS(الملاحظات!$D$5:$D$1004,A{r},الملاحظات!$E$5:$E$1004,"سلبي")/C{r})')
        tg.cell(row=r, column=4).number_format = "0%"
    grid(tg, T_FIRST, T_LAST, 4)
    formula_fill(tg, 3, T_FIRST, T_LAST)
    formula_fill(tg, 4, T_FIRST, T_LAST)
    tg.conditional_formatting.add(f"D{T_FIRST}:D{T_LAST}", CellIsRule(operator="greaterThanOrEqual", formula=["0.6"], fill=RED))
    tg.freeze_panes = "A5"

    nt = new_sheet(wb, "الملاحظات", "الملاحظات", "ملاحظة واحدة في كل صف: اقتباس أو سلوك مرصود.")
    header(nt, 4, ["#", "رمز الدراسة", "الملاحظة أو الاقتباس", "الوسم", "المشاعر", "المشارك"], [6, 14, 60, 22, 12, 12])
    notes = [
        ("S01", "«لم أفهم لماذا يطلب رقم الهاتف والبريد معًا»", "صعوبة التسجيل", "سلبي", "P1"),
        ("S01", "توقف المشارك عند رمز التحقق أكثر من دقيقة", "صعوبة التسجيل", "سلبي", "P2"),
        ("S01", "«التسجيل بحساب Google وفّر علي الوقت»", "صعوبة التسجيل", "إيجابي", "P3"),
        ("S01", "«لا أعرف الفرق بين الباقة الأساسية والمتقدمة»", "وضوح الأسعار", "سلبي", "P4"),
        ("S02", "تردد 4 من 6 مشاركين قبل إدخال بيانات البطاقة", "ثقة الدفع", "سلبي", "P1"),
        ("S02", "«أين ضريبة القيمة المضافة؟ ظهرت فجأة في النهاية»", "ثقة الدفع", "سلبي", "P2"),
        ("S02", "«شعار البنك طمأنني»", "ثقة الدفع", "إيجابي", "P5"),
        ("S02", "لم يجد المشارك زر الرجوع إلى السلة", "التنقل", "سلبي", "P3"),
        ("S02", "الصفحة الأخيرة استغرقت 6 ثوانٍ للتحميل", "الأداء", "سلبي", "P6"),
        ("S03", "32٪ من التعليقات المفتوحة ذكرت البطء", "الأداء", "سلبي", "—"),
        ("S03", "«الإشعارات كثيرة وأغلبها لا يهمني»", "الإشعارات", "سلبي", "—"),
        ("S03", "«الأسعار واضحة ومناسبة»", "وضوح الأسعار", "إيجابي", "—"),
        ("S03", "«لا أثق في حفظ بطاقتي في التطبيق»", "ثقة الدفع", "سلبي", "—"),
        ("S04", "أوقف 3 مشاركين الإشعارات في الأسبوع الأول", "الإشعارات", "سلبي", "P2"),
        ("S04", "«الإعدادات مخفية داخل الملف الشخصي»", "التنقل", "سلبي", "P7"),
        ("S04", "«التطبيق أسرع من الموقع»", "الأداء", "إيجابي", "P4"),
        ("S04", "ألغى مشارك الدفع لأنه لم ير طريقة الاسترجاع", "ثقة الدفع", "سلبي", "P9"),
        ("S04", "«أحتاج إشعارًا واحدًا فقط عند تأكيد الطلب»", "الإشعارات", "محايد", "P5"),
    ]
    for i, (s, text, tag, mood, p) in enumerate(notes):
        r = N_FIRST + i
        for j, v in enumerate((i + 1, s, text, tag, mood, p), start=1):
            nt.cell(row=r, column=j, value=v)
    grid(nt, N_FIRST, N_LAST, 6)
    list_validation(nt, f"B{N_FIRST}:B{N_LAST}", source=f"=الدراسات!$A${S_FIRST}:$A${S_LAST}")
    list_validation(nt, f"D{N_FIRST}:D{N_LAST}", source=f"=الوسوم!$A${T_FIRST}:$A${T_LAST}")
    list_validation(nt, f"E{N_FIRST}:E{N_LAST}", ["إيجابي", "محايد", "سلبي"])
    text_rules(nt, f"E{N_FIRST}:E{N_LAST}", {"إيجابي": GREEN, "سلبي": RED})
    nt.freeze_panes = "A5"

    ins = new_sheet(wb, "الرؤى", "الرؤى", "رؤية واحدة في كل صف، مربوطة بالوسم الذي يجمع أدلتها.")
    header(ins, 4, ["#", "الرؤية", "الوسم المرتبط", "عدد الأدلة", "عدد الدراسات", "قوة الدليل", "الأثر على العمل", "الأولوية", "الحالة", "الإجراء المقترح"], [6, 46, 20, 12, 12, 12, 14, 10, 16, 40])
    insights = [
        ("المستخدمون لا يثقون بالدفع حين تظهر رسوم في الخطوة الأخيرة", "ثقة الدفع", "عالٍ", "قيد المعالجة", "إظهار السعر النهائي مع الضريبة من صفحة السلة"),
        ("الإشعارات الكثيرة تدفع المستخدمين لإيقافها كلها", "الإشعارات", "متوسط", "جديدة", "تجميع الإشعارات وإتاحة التحكم لكل نوع"),
        ("طلب بيانات كثيرة عند التسجيل يبطئ المستخدم الجديد", "صعوبة التسجيل", "عالٍ", "جديدة", "تأجيل رقم الهاتف إلى ما بعد أول طلب"),
        ("الفرق بين الباقات غير واضح", "وضوح الأسعار", "متوسط", "مؤجلة", "جدول مقارنة مختصر في صفحة الأسعار"),
    ]
    for i, (text, tag, impact, status, action) in enumerate(insights):
        r = I_FIRST + i
        ins.cell(row=r, column=1, value=i + 1)
        ins.cell(row=r, column=2, value=text)
        ins.cell(row=r, column=3, value=tag)
        ins.cell(row=r, column=7, value=impact)
        ins.cell(row=r, column=9, value=status)
        ins.cell(row=r, column=10, value=action)
    studies_rng = f"الدراسات!$A${S_FIRST}:$A${S_LAST}"
    for r in range(I_FIRST, I_LAST + 1):
        ins.cell(row=r, column=4, value=f'=IF(C{r}="","",COUNTIF(الملاحظات!$D${N_FIRST}:$D${N_LAST},C{r}))')
        ins.cell(row=r, column=5, value=(
            f'=IF(C{r}="","",SUMPRODUCT(({studies_rng}<>"")*'
            f'(COUNTIFS(الملاحظات!$B${N_FIRST}:$B${N_LAST},{studies_rng},الملاحظات!$D${N_FIRST}:$D${N_LAST},C{r})>0)))'
        ))
        ins.cell(row=r, column=6, value=f'=IF(C{r}="","",IF(D{r}=0,"لا دليل",IF(AND(D{r}>=5,E{r}>=2),"قوي",IF(D{r}>=3,"متوسط","ضعيف"))))')
        ins.cell(row=r, column=8, value=(
            f'=IF(OR(C{r}="",G{r}=""),"",IF(AND(G{r}="عالٍ",OR(F{r}="قوي",F{r}="متوسط")),"P1",'
            f'IF(OR(G{r}="عالٍ",AND(G{r}="متوسط",F{r}="قوي")),"P2","P3")))'
        ))
    grid(ins, I_FIRST, I_LAST, 10)
    for col in (4, 5, 6, 8):
        formula_fill(ins, col, I_FIRST, I_LAST)
    list_validation(ins, f"C{I_FIRST}:C{I_LAST}", source=f"=الوسوم!$A${T_FIRST}:$A${T_LAST}")
    list_validation(ins, f"G{I_FIRST}:G{I_LAST}", ["عالٍ", "متوسط", "منخفض"])
    list_validation(ins, f"I{I_FIRST}:I{I_LAST}", ["جديدة", "قيد المعالجة", "تم التنفيذ", "مؤجلة"])
    text_rules(ins, f"F{I_FIRST}:F{I_LAST}", {"قوي": GREEN, "متوسط": AMBER, "ضعيف": RED, "لا دليل": GREY})
    text_rules(ins, f"H{I_FIRST}:H{I_LAST}", {"P1": RED, "P2": AMBER, "P3": BLUE})
    text_rules(ins, f"I{I_FIRST}:I{I_LAST}", {"تم التنفيذ": GREEN, "قيد المعالجة": BLUE})
    ins.freeze_panes = "A5"

    ls = wb.create_sheet("قوائم")
    ls.sheet_view.rightToLeft = True
    ls["A1"] = "المنهجيات"
    ls["A1"].font = Font(name=FONT, bold=True)
    for i, m in enumerate(methods, start=2):
        ls.cell(row=i, column=1, value=m)
    ls.column_dimensions["A"].width = 28

    band(dash, 6)
    dash.column_dimensions["A"].width = 30
    dash.column_dimensions["B"].width = 16
    dash.column_dimensions["D"].width = 26
    dash.column_dimensions["E"].width = 14
    dash.column_dimensions["F"].width = 14
    kpi(dash, 4, "عدد الدراسات", f"=COUNTA({studies_rng})")
    kpi(dash, 5, "عدد الملاحظات", f"=COUNTA(الملاحظات!$C${N_FIRST}:$C${N_LAST})")
    kpi(dash, 6, "نسبة الملاحظات السلبية", f'=IF(B5=0,0,COUNTIF(الملاحظات!$E${N_FIRST}:$E${N_LAST},"سلبي")/B5)', "0%")
    kpi(dash, 7, "عدد الرؤى", f"=COUNTA(الرؤى!$B${I_FIRST}:$B${I_LAST})")
    kpi(dash, 8, "رؤى بدليل قوي", f'=COUNTIF(الرؤى!$F${I_FIRST}:$F${I_LAST},"قوي")')
    kpi(dash, 9, "رؤى بأولوية P1", f'=COUNTIF(الرؤى!$H${I_FIRST}:$H${I_LAST},"P1")')
    kpi(dash, 10, "رؤى تم تنفيذها", f'=COUNTIF(الرؤى!$I${I_FIRST}:$I${I_LAST},"تم التنفيذ")')

    dash["D3"] = "الوسوم"
    dash["D3"].font = Font(name=FONT, size=12, bold=True, color=NAVY)
    table_head(dash, 4, ((4, "الوسم"), (5, "الملاحظات"), (6, "نسبة السلبية")))
    for i in range(10):
        r = 5 + i
        src = T_FIRST + i
        dash.cell(row=r, column=4, value=f'=IF(الوسوم!A{src}="","",الوسوم!A{src})')
        dash.cell(row=r, column=5, value=f'=IF(الوسوم!A{src}="","",الوسوم!C{src})')
        dash.cell(row=r, column=6, value=f'=IF(الوسوم!A{src}="","",الوسوم!D{src})').number_format = "0%"
        for col in (4, 5, 6):
            dash.cell(row=r, column=col).border = BORDER
    dash["D17"] = "الدراسات حسب المنهجية"
    dash["D17"].font = Font(name=FONT, size=12, bold=True, color=NAVY)
    table_head(dash, 18, ((4, "المنهجية"), (5, "الدراسات")))
    for i in range(len(methods)):
        r = 19 + i
        dash.cell(row=r, column=4, value=f"=قوائم!A{2 + i}").border = BORDER
        dash.cell(row=r, column=5, value=f"=COUNTIF(الدراسات!$C${S_FIRST}:$C${S_LAST},D{r})").border = BORDER

    bar = BarChart()
    bar.type = "bar"
    bar.title = "الملاحظات لكل وسم"
    bar.add_data(Reference(dash, min_col=5, min_row=4, max_row=14), titles_from_data=True)
    bar.set_categories(Reference(dash, min_col=4, min_row=5, max_row=14))
    bar.legend = None
    bar.height, bar.width = 8, 16
    dash.add_chart(bar, "H3")
    pie = PieChart()
    pie.title = "الدراسات حسب المنهجية"
    pie.add_data(Reference(dash, min_col=5, min_row=18, max_row=18 + len(methods)), titles_from_data=True)
    pie.set_categories(Reference(dash, min_col=4, min_row=19, max_row=18 + len(methods)))
    pie.height, pie.width = 8, 16
    dash.add_chart(pie, "H20")

    wb.save(OUT / "ux-research-repository.xlsx")


# ---------------------------------------------------------------- HEART dashboard


def build_heart_dashboard():
    wb = Workbook()
    start_sheet(
        wb,
        "لوحة مؤشرات تجربة المستخدم HEART",
        "إطار HEART من Google: السعادة، التفاعل، التبني، الاحتفاظ، ونجاح المهام.",
        [
            "في «إطار HEART» اكتب لكل بُعد الهدف والإشارة والمقياس والمستهدف، واختر هل الأعلى أفضل أم الأقل.",
            "في «البيانات الشهرية» أدخل قيمة كل مقياس في عمود الشهر، بالترتيب وبلا فراغات.",
            "لحساب NPS ألصق إجابات سؤال «ما احتمال أن توصي بنا؟» (0 إلى 10) في «حاسبة NPS»، وانقل النتيجة إلى شهرها.",
            "راجع «لوحة المؤشرات»: القيمة الحالية والسابقة والتغير وحالة كل مقياس مقابل المستهدف.",
        ],
        [
            ("لوحة المؤشرات", "الحالي والسابق والتغير والحالة، مع رسم الاتجاه."),
            ("إطار HEART", "الهدف والإشارة والمقياس والمستهدف لكل بُعد."),
            ("البيانات الشهرية", "قيمة كل مقياس شهرًا بشهر."),
            ("حاسبة NPS", "المروّجون والمحايدون والمنتقدون وصافي النتيجة."),
            ("الحالة", "على المسار: بلغ المستهدف. قريب: في حدود 10٪ منه. متأخر: أبعد من ذلك."),
        ],
    )
    dash = new_sheet(wb, "لوحة المؤشرات", "لوحة المؤشرات", "تتحدث تلقائيًا من «إطار HEART» و«البيانات الشهرية».")

    fw = new_sheet(wb, "إطار HEART", "إطار HEART", "مقياس واحد أو أكثر لكل بُعد، باسم فريد لكل مقياس.")
    header(fw, 4, ["البُعد", "الهدف", "الإشارة", "المقياس", "الوحدة", "الاتجاه المرغوب", "المستهدف"], [16, 40, 40, 30, 10, 16, 12])
    metrics = [
        ("السعادة", "أن يشعر المستخدم بأن المنتج يستحق التوصية", "إجابات استبيان NPS بعد الشراء", "صافي نقاط الترويج NPS", "نقاط", "الأعلى أفضل", 40),
        ("التفاعل", "أن يعود المستخدم ليستخدم المنتج كل أسبوع", "جلسات المستخدم في الأسبوع", "النشطون أسبوعيًا من الشهري", "٪", "الأعلى أفضل", 45),
        ("التبني", "أن يجرّب المستخدمون الجدد ميزة الحجز السريع", "أول استخدام للميزة خلال 7 أيام", "نسبة تبني الحجز السريع", "٪", "الأعلى أفضل", 30),
        ("الاحتفاظ", "أن يبقى المستخدم بعد الشهر الأول", "النشاط بعد 30 يومًا من التسجيل", "الاحتفاظ بعد 30 يومًا", "٪", "الأعلى أفضل", 35),
        ("نجاح المهام", "أن يكمل المستخدم الحجز دون أخطاء", "إكمال مسار الحجز", "معدل إكمال الحجز", "٪", "الأعلى أفضل", 80),
        ("نجاح المهام", "أن تقل أخطاء النماذج", "رسائل الخطأ في نموذج الدفع", "الجلسات بخطأ في الدفع", "٪", "الأقل أفضل", 5),
    ]
    F_FIRST, F_LAST = 5, 19
    for i, row in enumerate(metrics):
        for j, v in enumerate(row, start=1):
            fw.cell(row=F_FIRST + i, column=j, value=v)
    grid(fw, F_FIRST, F_LAST, 7)
    list_validation(fw, f"A{F_FIRST}:A{F_LAST}", ["السعادة", "التفاعل", "التبني", "الاحتفاظ", "نجاح المهام"])
    list_validation(fw, f"E{F_FIRST}:E{F_LAST}", ["٪", "نقاط", "رقم", "ثانية", "دقيقة"])
    list_validation(fw, f"F{F_FIRST}:F{F_LAST}", ["الأعلى أفضل", "الأقل أفضل"])
    fw.freeze_panes = "A5"

    md = new_sheet(wb, "البيانات الشهرية", "البيانات الشهرية", "اكتب قيم كل شهر بالترتيب بلا فراغات: آخر خلية مملوءة هي القيمة الحالية.")
    months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
    header(md, 4, ["المقياس"] + months, [34] + [10] * 12)
    sample = [
        [22, 25, 27, 31, 34, 38],
        [38, 39, 41, 40, 43, 44],
        [12, 15, 19, 24, 27, 31],
        [30, 31, 29, 32, 33, 34],
        [71, 73, 76, 78, 79, 82],
        [11, 10, 9, 7, 6, 6],
    ]
    for i in range(F_LAST - F_FIRST + 1):
        r = F_FIRST + i
        md.cell(row=r, column=1, value=f"=IF('إطار HEART'!D{r}=\"\",\"\",'إطار HEART'!D{r})")
        if i < len(sample):
            for j, v in enumerate(sample[i], start=2):
                md.cell(row=r, column=j, value=v)
    grid(md, F_FIRST, F_LAST, 13)
    formula_fill(md, 1, F_FIRST, F_LAST)
    md.freeze_panes = "B5"

    nps = new_sheet(wb, "حاسبة NPS", "حاسبة NPS", "ألصق الإجابات (0 إلى 10) في العمود A، إجابة في كل صف.")
    for col, width in (("A", 14), ("C", 26), ("D", 14), ("E", 14)):
        nps.column_dimensions[col].width = width
    band(nps, 5)
    table_head(nps, 4, ((1, "الإجابة"), (3, "الفئة"), (4, "العدد"), (5, "النسبة")))
    answers = [10, 9, 9, 8, 7, 10, 6, 9, 5, 10, 8, 9, 3, 10, 9, 7, 8, 10, 9, 6, 10, 9, 4, 8, 9, 10, 7, 9, 10, 2]
    A_FIRST, A_LAST = 5, 1004
    for i, v in enumerate(answers):
        nps.cell(row=A_FIRST + i, column=1, value=v)
    for r in range(A_FIRST, A_LAST + 1):
        nps.cell(row=r, column=1).border = BORDER
    number_validation(nps, f"A{A_FIRST}:A{A_LAST}", 0, 10)
    rng = f"$A${A_FIRST}:$A${A_LAST}"
    groups = [
        ("المروّجون (9-10)", f'=COUNTIF({rng},">=9")', GREEN),
        ("المحايدون (7-8)", f'=COUNTIFS({rng},">=7",{rng},"<=8")', AMBER),
        ("المنتقدون (0-6)", f'=COUNTIF({rng},"<=6")', RED),
    ]
    for i, (label, f, fill) in enumerate(groups):
        r = 5 + i
        nps.cell(row=r, column=3, value=label).fill = fill
        nps.cell(row=r, column=4, value=f)
        nps.cell(row=r, column=5, value=f"=IF($D$8=0,0,D{r}/$D$8)").number_format = "0%"
        for col in (3, 4, 5):
            nps.cell(row=r, column=col).border = BORDER
    nps["C8"] = "إجمالي الإجابات"
    nps["D8"] = f"=COUNT({rng})"
    nps["C10"] = "صافي نقاط الترويج NPS"
    nps["D10"] = '=IF(D8=0,"",ROUND((D5-D7)/D8*100,0))'
    nps["C11"] = "التقدير"
    nps["D11"] = '=IF(D10="","",IF(D10>=50,"ممتاز",IF(D10>=30,"جيد جدًا",IF(D10>=0,"مقبول","يحتاج تدخلًا"))))'
    for cell in ("C8", "C10", "C11"):
        nps[cell].font = Font(name=FONT, bold=True)
    nps["D10"].font = Font(name=FONT, size=16, bold=True, color=NAVY)
    for cell in ("C8", "D8", "C10", "D10", "C11", "D11"):
        nps[cell].border = BORDER
    pie = PieChart()
    pie.title = "توزيع الإجابات"
    pie.add_data(Reference(nps, min_col=4, min_row=4, max_row=7), titles_from_data=True)
    pie.set_categories(Reference(nps, min_col=3, min_row=5, max_row=7))
    pie.height, pie.width = 8, 12
    nps.add_chart(pie, "G4")

    band(dash, 9)
    widths = [16, 34, 10, 12, 12, 12, 12, 14, 10]
    labels = ["البُعد", "المقياس", "الوحدة", "المستهدف", "الحالي", "السابق", "التغير", "الحالة", "الأشهر"]
    for i, w in enumerate(widths, start=1):
        dash.column_dimensions[dash.cell(row=1, column=i).column_letter].width = w
    table_head(dash, 4, list(enumerate(labels, start=1)))
    f = "'إطار HEART'!"
    for i in range(F_LAST - F_FIRST + 1):
        r = F_FIRST + i
        m = f"'البيانات الشهرية'!$B{r}:$M{r}"
        dash.cell(row=r, column=1, value=f'=IF({f}D{r}="","",{f}A{r})')
        dash.cell(row=r, column=2, value=f'=IF({f}D{r}="","",{f}D{r})')
        dash.cell(row=r, column=3, value=f'=IF({f}D{r}="","",{f}E{r})')
        dash.cell(row=r, column=4, value=f'=IF({f}D{r}="","",{f}G{r})')
        dash.cell(row=r, column=9, value=f'=IF({f}D{r}="","",COUNT({m}))')
        dash.cell(row=r, column=5, value=f'=IF(OR(B{r}="",I{r}=0),"",INDEX({m},1,I{r}))')
        dash.cell(row=r, column=6, value=f'=IF(OR(B{r}="",I{r}<2),"",INDEX({m},1,I{r}-1))')
        dash.cell(row=r, column=7, value=f'=IF(OR(E{r}="",F{r}=""),"",E{r}-F{r})')
        dash.cell(row=r, column=8, value=(
            f'=IF(OR(E{r}="",D{r}=""),"",IF({f}F{r}="الأقل أفضل",'
            f'IF(E{r}<=D{r},"على المسار",IF(E{r}<=D{r}+ABS(D{r})*0.1,"قريب","متأخر")),'
            f'IF(E{r}>=D{r},"على المسار",IF(E{r}>=D{r}-ABS(D{r})*0.1,"قريب","متأخر"))))'
        ))
        dash.cell(row=r, column=7).number_format = "+0.0;-0.0;0"
        for col in range(1, 10):
            c = dash.cell(row=r, column=col)
            c.border = BORDER
            c.font = Font(name=FONT, size=10)
            if col > 2:
                c.alignment = Alignment(horizontal="center")
    text_rules(dash, f"H{F_FIRST}:H{F_LAST}", {"على المسار": GREEN, "قريب": AMBER, "متأخر": RED})
    dash.cell(row=F_LAST + 2, column=1, value="ملخص").font = Font(name=FONT, size=12, bold=True, color=NAVY)
    kpi_row = F_LAST + 3
    for i, label in enumerate(["على المسار", "قريب", "متأخر"]):
        kpi(dash, kpi_row + i, label, f'=COUNTIF($H${F_FIRST}:$H${F_LAST},"{label}")')
    line = LineChart()
    line.title = "اتجاه المقاييس"
    line.add_data(Reference(md, min_col=1, max_col=13, min_row=F_FIRST, max_row=F_FIRST + len(metrics) - 1), from_rows=True, titles_from_data=True)
    line.set_categories(Reference(md, min_col=2, max_col=13, min_row=4))
    line.height, line.width = 9, 22
    dash.add_chart(line, f"A{kpi_row + 4}")

    wb.save(OUT / "heart-ux-metrics-dashboard.xlsx")


# ---------------------------------------------------------------- competitive analysis


def build_competitive_analysis():
    wb = Workbook()
    start_sheet(
        wb,
        "تحليل تجربة المستخدم للمنافسين",
        "قارن تجربة منتجك بالمنافسين بمعايير موزونة، وحوّل الفجوات إلى فرص مرتبة.",
        [
            "اكتب منتجك في الصف الأول من «المنافسون» ثم حتى خمسة منافسين.",
            "حدد معايير التقييم وأوزانها في «معايير التقييم» حتى يصبح مجموع الأوزان 100٪.",
            "قيّم كل منتج من 1 إلى 5 على كل معيار في «مصفوفة التقييم»: تُحسب الدرجة الموزونة والترتيب.",
            "في «مقارنة الميزات» اختر لكل ميزة: نعم، جزئي، أو لا. تُعلَّم الفجوات تلقائيًا.",
            "انقل الفجوات المهمة إلى «الفرص» وقدّر الأثر والجهد من 1 إلى 5: يُصنف كل منها ويُرتب.",
        ],
        [
            ("المنافسون", "منتجك وحتى خمسة منافسين."),
            ("معايير التقييم", "المعايير وأوزانها مع تنبيه حين لا يكتمل المجموع."),
            ("مصفوفة التقييم", "الدرجات والدرجة الموزونة والترتيب ورسم بياني."),
            ("مقارنة الميزات", "وجود كل ميزة لدى كل منتج ونسبة التغطية."),
            ("الفرص", "مكسب سريع، مشروع كبير، تحسين بسيط، أو تجنّب."),
        ],
    )
    cp = new_sheet(wb, "المنافسون", "المنافسون", "الصف الأول لمنتجك دائمًا.")
    header(cp, 4, ["#", "المنتج", "الشريحة المستهدفة", "نموذج التسعير", "الرابط", "ملاحظات"], [10, 24, 28, 18, 30, 40])
    products = [
        ("منتجك", "تطبيق حجزي", "العيادات الصغيرة", "اشتراك شهري", "https://example.com", "نسختنا الحالية"),
        ("منافس 1", "موعد", "العيادات والمراكز", "اشتراك شهري", "", "الأكبر حصة في السوق"),
        ("منافس 2", "احجزلي", "الأفراد", "عمولة على الحجز", "", ""),
        ("منافس 3", "كلينك برو", "المستشفيات", "ترخيص سنوي", "", "واجهة قديمة لكن ميزات كثيرة"),
        ("منافس 4", "", "", "", "", ""),
        ("منافس 5", "", "", "", "", ""),
    ]
    for i, row in enumerate(products):
        for j, v in enumerate(row, start=1):
            cp.cell(row=5 + i, column=j, value=v)
    grid(cp, 5, 10, 6, fill_from=2)
    list_validation(cp, "D5:D10", ["مجاني", "فريميوم", "اشتراك شهري", "ترخيص سنوي", "عمولة على الحجز", "دفعة واحدة"])

    cr = new_sheet(wb, "معايير التقييم", "معايير التقييم", "الأوزان نسب مئوية، ومجموعها يجب أن يكون 100٪.")
    header(cr, 4, ["المعيار", "ما الذي نقيسه", "الوزن"], [26, 60, 12])
    criteria = [
        ("سهولة التسجيل", "عدد الخطوات والبيانات المطلوبة حتى أول استخدام", 0.15),
        ("وضوح التنقل", "سهولة الوصول إلى الوظائف الأساسية", 0.15),
        ("سرعة إتمام المهمة الأساسية", "زمن وخطوات إتمام حجز موعد", 0.2),
        ("وضوح الأسعار", "فهم الباقات والرسوم قبل الدفع", 0.1),
        ("الثقة والأمان", "إشارات الثقة وسياسة الاسترجاع", 0.1),
        ("الأداء", "سرعة التحميل والاستجابة", 0.1),
        ("إمكانية الوصول", "التباين وحجم الخط ودعم قارئ الشاشة", 0.1),
        ("الدعم والمساعدة", "سهولة الوصول إلى المساعدة داخل المنتج", 0.1),
    ]
    C_FIRST, C_LAST = 5, 19
    for i, row in enumerate(criteria):
        for j, v in enumerate(row, start=1):
            cr.cell(row=C_FIRST + i, column=j, value=v)
    for r in range(C_FIRST, C_LAST + 1):
        cr.cell(row=r, column=3).number_format = "0%"
    grid(cr, C_FIRST, C_LAST, 3)
    total_row = C_LAST + 1
    cr.cell(row=total_row, column=2, value="مجموع الأوزان").font = Font(name=FONT, bold=True)
    cr.cell(row=total_row, column=3, value=f"=SUM(C{C_FIRST}:C{C_LAST})").number_format = "0%"
    cr.cell(row=total_row + 1, column=2, value=f'=IF(ROUND(C{total_row},4)=1,"الأوزان مكتملة","تنبيه: مجموع الأوزان يجب أن يكون 100٪")')
    cr.conditional_formatting.add(f"B{total_row + 1}", FormulaRule(formula=[f"ROUND($C${total_row},4)<>1"], fill=RED))
    cr.conditional_formatting.add(f"B{total_row + 1}", FormulaRule(formula=[f"ROUND($C${total_row},4)=1"], fill=GREEN))
    dv = DataValidation(type="decimal", operator="between", formula1="0", formula2="1", allow_blank=True)
    dv.error = "أدخل نسبة من 0٪ إلى 100٪."
    cr.add_data_validation(dv)
    dv.add(f"C{C_FIRST}:C{C_LAST}")

    mx = new_sheet(wb, "مصفوفة التقييم", "مصفوفة التقييم", "1 = ضعيف جدًا، 5 = ممتاز. أسماء الأعمدة تأتي من «المنافسون».")
    header(mx, 4, ["المعيار", "الوزن", "", "", "", "", "", ""], [30, 10, 14, 14, 14, 14, 14, 14])
    for k in range(6):
        mx.cell(row=4, column=3 + k, value=f'=IF(المنافسون!B{5 + k}="",المنافسون!A{5 + k},المنافسون!B{5 + k})')
    scores = [
        [3, 4, 4, 2], [4, 4, 3, 2], [4, 3, 4, 3], [2, 4, 3, 3],
        [3, 4, 3, 4], [4, 3, 4, 2], [2, 3, 2, 3], [3, 4, 2, 4],
    ]
    for i in range(C_LAST - C_FIRST + 1):
        r = C_FIRST + i
        mx.cell(row=r, column=1, value=f"=IF('معايير التقييم'!A{r}=\"\",\"\",'معايير التقييم'!A{r})")
        mx.cell(row=r, column=2, value=f"=IF('معايير التقييم'!A{r}=\"\",\"\",'معايير التقييم'!C{r})").number_format = "0%"
        if i < len(scores):
            for k, v in enumerate(scores[i]):
                mx.cell(row=r, column=3 + k, value=v)
    grid(mx, C_FIRST, C_LAST, 8, fill_from=3)
    number_validation(mx, f"C{C_FIRST}:H{C_LAST}", 1, 5)
    mx.conditional_formatting.add(
        f"C{C_FIRST}:H{C_LAST}",
        ColorScaleRule(start_type="num", start_value=1, start_color="F8696B", mid_type="num", mid_value=3, mid_color="FFEB84", end_type="num", end_value=5, end_color="63BE7B"),
    )
    w = f"$B${C_FIRST}:$B${C_LAST}"
    R_SCORE, R_100, R_RANK = C_LAST + 1, C_LAST + 2, C_LAST + 3
    mx.cell(row=R_SCORE, column=1, value="الدرجة الموزونة (من 5)")
    mx.cell(row=R_100, column=1, value="الدرجة من 100")
    mx.cell(row=R_RANK, column=1, value="الترتيب")
    for k in range(6):
        col = mx.cell(row=4, column=3 + k).column_letter
        rng = f"{col}${C_FIRST}:{col}${C_LAST}"
        mx.cell(row=R_SCORE, column=3 + k, value=f'=IF(COUNT({rng})=0,"",SUMPRODUCT({w},{rng})/SUMPRODUCT({w},--(ISNUMBER({rng}))))').number_format = "0.00"
        mx.cell(row=R_100, column=3 + k, value=f'=IF({col}{R_SCORE}="",0,ROUND({col}{R_SCORE}/5*100,0))')
        mx.cell(row=R_RANK, column=3 + k, value=f'=IF({col}{R_SCORE}="","",RANK({col}{R_SCORE},$C${R_SCORE}:$H${R_SCORE}))')
    for r in (R_SCORE, R_100, R_RANK):
        for col in range(1, 9):
            c = mx.cell(row=r, column=col)
            c.font = Font(name=FONT, bold=True)
            c.fill = PatternFill("solid", fgColor=LIGHT)
            c.border = BORDER
            c.alignment = Alignment(horizontal="center")
    mx.conditional_formatting.add(f"C{R_RANK}:H{R_RANK}", CellIsRule(operator="equal", formula=["1"], fill=GREEN))
    mx.freeze_panes = "C5"
    bar = BarChart()
    bar.title = "الدرجة من 100"
    bar.add_data(Reference(mx, min_col=3, max_col=8, min_row=R_100), from_rows=True, titles_from_data=False)
    bar.set_categories(Reference(mx, min_col=3, max_col=8, min_row=4))
    bar.legend = None
    bar.height, bar.width = 8, 18
    mx.add_chart(bar, f"A{R_RANK + 3}")

    ft = new_sheet(wb, "مقارنة الميزات", "مقارنة الميزات", "نعم = موجودة، جزئي = موجودة بشكل محدود، لا = غير موجودة.")
    header(ft, 4, ["الميزة", "", "", "", "", "", "", "فجوة لدينا؟"], [32, 14, 14, 14, 14, 14, 14, 16])
    for k in range(6):
        ft.cell(row=4, column=2 + k, value=f"='مصفوفة التقييم'!{mx.cell(row=4, column=3 + k).column_letter}4")
    features = [
        ("التسجيل بحساب Google أو Apple", ["نعم", "نعم", "لا", "لا"]),
        ("حجز موعد في أقل من 3 خطوات", ["جزئي", "نعم", "نعم", "لا"]),
        ("تذكير قبل الموعد", ["نعم", "نعم", "نعم", "نعم"]),
        ("الدفع الإلكتروني داخل التطبيق", ["لا", "نعم", "نعم", "جزئي"]),
        ("إلغاء أو تعديل الموعد ذاتيًا", ["جزئي", "نعم", "نعم", "لا"]),
        ("تقييم الطبيب بعد الزيارة", ["لا", "نعم", "لا", "نعم"]),
        ("الوضع الداكن", ["نعم", "لا", "لا", "لا"]),
        ("دعم اللغة العربية بالكامل", ["نعم", "جزئي", "نعم", "لا"]),
        ("دردشة دعم داخل التطبيق", ["لا", "نعم", "لا", "جزئي"]),
    ]
    FT_FIRST, FT_LAST = 5, 44
    for i, (name, vals) in enumerate(features):
        ft.cell(row=FT_FIRST + i, column=1, value=name)
        for k, v in enumerate(vals):
            ft.cell(row=FT_FIRST + i, column=2 + k, value=v)
    for r in range(FT_FIRST, FT_LAST + 1):
        ft.cell(row=r, column=8, value=f'=IF(OR(A{r}="",B{r}="نعم",B{r}=""),"",IF(COUNTIF(C{r}:G{r},"نعم")>=2,"فجوة مهمة",IF(COUNTIF(C{r}:G{r},"نعم")=1,"فجوة","")))')
    grid(ft, FT_FIRST, FT_LAST, 8)
    formula_fill(ft, 8, FT_FIRST, FT_LAST)
    list_validation(ft, f"B{FT_FIRST}:G{FT_LAST}", ["نعم", "جزئي", "لا"])
    text_rules(ft, f"B{FT_FIRST}:G{FT_LAST}", {"نعم": GREEN, "جزئي": AMBER, "لا": RED})
    text_rules(ft, f"H{FT_FIRST}:H{FT_LAST}", {"فجوة مهمة": RED, "فجوة": AMBER})
    cov = FT_LAST + 1
    ft.cell(row=cov, column=1, value="نسبة التغطية")
    for k in range(6):
        col = ft.cell(row=1, column=2 + k).column_letter
        rng = f"{col}{FT_FIRST}:{col}{FT_LAST}"
        ft.cell(row=cov, column=2 + k, value=f'=IF(COUNTA({rng})=0,"",(COUNTIF({rng},"نعم")+0.5*COUNTIF({rng},"جزئي"))/COUNTA({rng}))').number_format = "0%"
    for col in range(1, 9):
        c = ft.cell(row=cov, column=col)
        c.font = Font(name=FONT, bold=True)
        c.fill = PatternFill("solid", fgColor=LIGHT)
        c.border = BORDER
    ft.freeze_panes = "B5"

    op = new_sheet(wb, "الفرص", "الفرص", "الأثر والجهد من 1 إلى 5. الدرجة = الأثر × 2 − الجهد.")
    header(op, 4, ["الفرصة", "المصدر", "الأثر", "الجهد", "التصنيف", "الدرجة", "الترتيب", "المسؤول"], [44, 20, 10, 10, 16, 10, 10, 16])
    opps = [
        ("إضافة الدفع الإلكتروني داخل التطبيق", "مقارنة الميزات", 5, 4, "فريق الدفع"),
        ("إلغاء وتعديل الموعد ذاتيًا بالكامل", "مقارنة الميزات", 4, 2, "فريق الحجز"),
        ("تحسين وضوح صفحة الأسعار", "مصفوفة التقييم", 3, 1, "التصميم"),
        ("تحسين التباين وأحجام الخط", "مصفوفة التقييم", 3, 2, "التصميم"),
        ("دردشة دعم داخل التطبيق", "مقارنة الميزات", 2, 4, ""),
        ("تقييم الطبيب بعد الزيارة", "مقارنة الميزات", 2, 2, ""),
    ]
    O_FIRST, O_LAST = 5, 54
    for i, (name, src, imp, eff, owner) in enumerate(opps):
        r = O_FIRST + i
        for col, v in ((1, name), (2, src), (3, imp), (4, eff), (8, owner)):
            op.cell(row=r, column=col, value=v)
    for r in range(O_FIRST, O_LAST + 1):
        op.cell(row=r, column=5, value=(
            f'=IF(OR(C{r}="",D{r}=""),"",IF(C{r}>=3,IF(D{r}<=2,"مكسب سريع","مشروع كبير"),IF(D{r}<=2,"تحسين بسيط","تجنّب")))'
        ))
        op.cell(row=r, column=6, value=f'=IF(OR(C{r}="",D{r}=""),"",C{r}*2-D{r})')
        op.cell(row=r, column=7, value=f'=IF(F{r}="","",RANK(F{r},$F${O_FIRST}:$F${O_LAST}))')
    grid(op, O_FIRST, O_LAST, 8)
    for col in (5, 6, 7):
        formula_fill(op, col, O_FIRST, O_LAST)
    number_validation(op, f"C{O_FIRST}:D{O_LAST}", 1, 5)
    list_validation(op, f"B{O_FIRST}:B{O_LAST}", ["مقارنة الميزات", "مصفوفة التقييم", "أبحاث المستخدمين", "أخرى"])
    text_rules(op, f"E{O_FIRST}:E{O_LAST}", {"مكسب سريع": GREEN, "مشروع كبير": BLUE, "تحسين بسيط": AMBER, "تجنّب": GREY})
    op.freeze_panes = "A5"

    wb.save(OUT / "competitive-ux-analysis.xlsx")


if __name__ == "__main__":
    build_research_repository()
    build_heart_dashboard()
    build_competitive_analysis()
    print("Built 3 paid templates in", OUT)
