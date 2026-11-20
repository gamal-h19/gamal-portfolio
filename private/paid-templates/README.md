# القوالب المدفوعة

ملفات القوالب المدفوعة الثلاثة في `public/downloads/templates/`. تُطلب القوالب من السلة: يدفع العميل بتحويل InstaPay أو المحفظة، ويصلك بريد بالطلب فيه روابط القوالب، فترد عليه بها بعد تأكيد التحويل.

لتسليم نسخة Google Sheets بدل ملف `.xlsx`، ضع رابط «إنشاء نسخة» في `sheetUrl` للقالب في `src/features/templates/data/templates.ts`.

| الملف                             | القالب                           | السعر |
| --------------------------------- | -------------------------------- | ----- |
| `ux-research-repository.xlsx`     | مستودع أبحاث المستخدمين          | 12$   |
| `heart-ux-metrics-dashboard.xlsx` | لوحة مؤشرات تجربة المستخدم HEART | 15$   |
| `competitive-ux-analysis.xlsx`    | تحليل تجربة المستخدم للمنافسين   | 9$    |

## إيقاف التحميل المباشر

الملفات ما زالت متاحة لمن يعرف رابطها المباشر. لإيقاف ذلك:

1. ضع رابط Google Sheets في `sheetUrl` للقوالب الثلاثة، واحذف سطر `href`.
2. انقل الملفات الثلاثة من `public/downloads/templates/` إلى هذا المجلد، حتى لا تبقى متاحة برابطها المباشر.
3. في `build_paid_templates.py` غيّر `OUT` إلى `Path(__file__).parent`.

## فتح ملف في Google Sheets

1. من Google Drive: «جديد» ثم «تحميل ملف» واختر ملف `.xlsx`.
2. انقر الملف مرتين، ثم «فتح باستخدام» و«جداول بيانات Google».
3. من «ملف» اختر «حفظ كجداول بيانات Google». اعمل على النسخة الجديدة.
4. ابدأ من ورقة «ابدأ هنا»، ثم امسح بيانات الأمثلة وضع بياناتك.

## إعادة بناء الملفات

`build_paid_templates.py` يبني الملفات الثلاثة من الصفر في `public/downloads/templates/`:

```bash
pip install openpyxl
python3 private/paid-templates/build_paid_templates.py
```
