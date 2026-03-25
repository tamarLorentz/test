# מערכת ניהול בקשות תשלום 💰

## תיאור קצר של המערכת

מערכת ניהול בקשות תשלום היא פלטפורמה דיגיטלית למעקב ואישור בקשות תשלום ליועצים בארגון. המערכת מאפשרת ניהול מלא של מחזור חיי הבקשה - החל מיצירה ועד לאישור סופי, עם תמיכה במעקב SLA וניטור בתזמון.

## קהל היעד

### 1. יועצים (Consultants) 🔷
- יכולים ליצור בקשות תשלום חדשות עבור עבודה שביצעו
- רואים רק את הבקשות שלהם (My Requests)
- יכולים לערוך בקשות רק בסטטוסים: טיוטה, בדיקה, או ממתין להבהרה

### 2. עובדי ארגון (Organization Employees) 👤
- רואים את כל בקשות התשלום של כל היועצים
- יכולים לשנות סטטוס של בקשות (בדיקה, אישור, דחייה, בקשת הבהרה)
- יכולים להוסיף הערות והבהרות לבקשות
- גישה מלאה לדשבורד SLA ניטור ומעקב בתזמון
-מידע ברור לגבי בקשות שכבר מחכות במערכת זמן רב  או מחכות להבהרה כבר זמן רב
---

## פיצ'רים עיקריים 🎯

### 1. ניהול בקשות
- ✅ יצירת בקשות תשלום חדשות עם פרטים מלאים
- ✅ עריכת בקשות קיימות (עם הגבלות סטטוס)
- ✅ הצגת רשימת בקשות עם סינון וחיפוש
- ✅ מעקב מלא אחרי סטטוס הבקשה

### 2. סטטוסים וזרימת עבודה
- **טיוטה** ✏️ - בקשה שנמצאת בשלב העיוני
- **בדיקה** 👀 - בקשה שנשלחה לבדיקה
- **ממתין להבהרה** ❓ - נדרשת הבהרה מהיועץ
- **אושר לתשלום** ✅ - אישור חתום
- **נדחה** ❌ - בקשה שנדחתה
- **סיום** 🏁 - תהליך הושלם

### 3. דשבורד SLA
- 📊 ניטור בקשות חריגות (>90 ימים במערכת)
- ⏱️ מעקב אחרי בקשות "תקועות" (בסטטוס ממתין להבהרה)


### 4. בקרת גישה מבוססת תפקיד (RBAC)
- הסתרת כפתורים ותכונות לא רלוונטיים
- הגבלת גישה לנתונים רגישים
- עריכה מוגבלת לפי תפקיד וסטטוס בקשה

### 5. חוויית משתמש (UX)
- ✅ כפתור "חזור" בכל מסך ודף (ניווט קל)
- ✅ הודעת Welcome עם שם המשתמש בכל דף
- ✅ כפתור "החלף משתמש" בכל עמוד (logout וחזרה להתחברות)
- ✅ ולידציות ברורות בטפסים עם הודעות שגיאה בעברית
- ✅ ראשי עמודים ברורים המציגים את מצב המשתמש

### 6. תהליך התחברות (Mock Authentication)
- ✅ מסך Login ככניסה ראשונית למערכת
- ✅ הזנת שם פרטי ושם משפחה עם ולידציה
- ✅ בחירת תפקיד (יועץ / עובד ארגון)
- ✅ שמירת משתמש בזיכרון (ללא Backend)
- ✅ ניהול session דרך React Context
- ✅ טופס התחברות מאובטח עם ולידציה

---

## החלטות תכנון מרכזיות 🏗️

### 1. ממשק משתמש דו-זרימי (Dual UI Path)
**החלטה:** בחרנו לבנות שתי חוויות שונות לחלוטין עבור יועצים ועובדי ארגון בעריכת בקשה.

**סיבה:**
- יועצים צריכים לערוך את כל פרטי הבקשה (Form עם inputs חופשיים)
- עובדי ארגון צריכים רק לשנות סטטוס וקטגוריה (View read-only + Action buttons)
- זה מונע שגיאות בעריכה ומפשט את זרימת העבודה

**יישום:** בקובץ `RequestFormPage.tsx`, בדקנו את התפקיד וייצגנו את הממשק המתאים.

---

### 2. חישוב SLA דינמי (Dynamic SLA Calculation)
**החלטה:** חישבנו את הדה date בזמן אמת
**סיבה:**
- תמיד מדויק (לא תלוי בכניסת נתונים ידנית)
- חוסך שטח בדטה
- אפשר להשתמש בתאריך הנוכחי כ-reference

**יישום:** תיקיה `utils/slaCalculations.ts` עם פונקציות כמו `getDaysInSystem()` ו-`calculateSLAMetrics()`.

---

### 3. בדיקת גישה קדם-Load (Pre-Load Access Check)
**החלטה:** בדקנו הרשאות לפני טעינת הבקשה.

**סיבה:**
- יועצים יכולים לערוך רק בקשות שלהם

**יישום:** ב-`RequestFormPage.tsx` - ב-`useEffect`, אנו בודקים אם היועץ שייך לבקשה.

---

### 4. Consultant Name Locking
**החלטה:** נעלנו את שדה "שם היועץ" כאשר יועץ מערך בקשה.

**סיבה:**
- מניעת מעויות בהקצאת בקשות
- יועץ לא יכול לשלוח בקשה בשם של יועץ אחר
- אבל עובד ארגון יכול לתקן שגיאות הקלדה

**יישום:** בקובץ `RequestForm.tsx`, ה-prop `isConsultant` קובע את `disabled` של השדה.

---

### 5. סינון לפי תפקיד בדשבורד
**החלטה:** יועצים ראים רק בקשות שלהם, עובדים רואים הכל.

**סיבה:**
- כל יועץ רק צריך לראות את הבקשות שלו
- עובדים צריכים views administrative

**יישום:** ב-`DashboardPage.tsx`, פונקציית `useMemo` עם `userRequests` מסננת לפי תפקיד.

---

### 6. טופס דינמי עם Validation
**החלטה:** כל שדה בטופס עם:
- תיקיה validation
- הודעות שגיאה בעברית
- תנאי disabled לפי סטטוס

**סיבה:**
- דקיקות נתונים גבוהה
- משוב מיידי למשתמש
- מניעת שליחה לא תקינה

**יישום:** קובץ `utils/formValidation.ts` עם פונקציות validation.

---

### 7. סימולציית העלאת קבצים (File Upload Simulation)
**החלטה:** לא יישמנו backend אמיתי, רק סימולציה.

**סיבה:**
- ממקד על logic ממשק ה-UI
- מוקדם לשלב ה-MVP - backend ניתן להוסיף בעתיד

**יישום:** `RequestForm.tsx` - שדה file מאחסן רק את השם בערך.

---

### 8. ניתוב מסתור (Protected Routes)
**החלטה:** דשבורד SLA מוגן - עובדים בלבד.

**סיבה:**
- יועצים לא צריכים תכונות ניהוליות

**יישום:** ב-`App.tsx`, הקישור "ניטור SLA" מוקדד בתנאי.

---

### 9. ממשק משתמש ניידותי (User-Friendly UX)
**החלטה:** הוספנו כפתורים בכל קרן הדף כדי להקל על הניווט.

**סיבה:**
- משתמשים צריכים לדעת איפה הם נמצאים ומי גם זה משתמש שמחובר
- כפתור "חזור" קל גישה בכל עמוד
- הודעת Welcome נותנת context למשתמש
- כפתור "החלף משתמש" מאפשר logout מהיר

**יישום:** 
- `App.tsx` header - הצגת שם משתמש + תג תפקיד
- `RequestFormPage.tsx` - כפתור "חזור" בעליון
- הודעות שגיאה ברורות בעברית בטפסים

---

### 10. תהליך התחברות בטרום (Mock Authentication)
**החלטה:** בחרנו ב-mock authentication במקום integration עם backend מלא.

**סיבה:**
- ממקד על ממשק ה-UI וlogin flow
- שימור השדית בContext API (ללא backend)
- קל לעדכון לmultiplayer תצריף בעתיד

**יישום:** 
- `LoginPage.tsx` - טופס התחברות עם ולידציה
- `UserContext.tsx` - ניהול state משתמש
- בדיקות הרשאות קדם-render בקומפוננטות

---

## טכנולוגיה וטכנולוגיות 🛠️

| שכבה | טכנולוגיה | גרסה |
|--------|-----------|---------|
| **Frontend Framework** | React | 18.2.0 |
| **Language** | TypeScript | 5.0.2 |
| **Build Tool** | Vite | 4.5.14 |
| **CSS Framework** | Tailwind CSS | 3.4.3 |
| **Routing** | React Router DOM | 7.13.2 |
| **Icons** | Lucide React | 1.0.1 |
| **RTL Support** | RTL CSS | Built-in |
| **Font** | Inter | Google Fonts |

---

## מבנה הפרויקט 📁

```
src/
├── components/
│   ├── RequestCard.tsx          # כרטיסיה בודדת של בקשה
│   ├── RequestForm.tsx          # טופס יצירה/עריכה
│   ├── StatusBadge.tsx          # תג סטטוס צבעוני
│   ├── PriorityBadge.tsx        # תג עדיפות
│   ├── SLADashboard.tsx         # דשבורד SLA
│   └── EditRequestModal.tsx     # מודל עריכה (legacy)
│
├── pages/
│   ├── LoginPage.tsx            # דף התחברות
│   ├── DashboardPage.tsx        # דשבורד ראשי + רשימה
│   ├── SLAPage.tsx              # דף SLA
│   └── RequestFormPage.tsx      # דף טופס יצירה/עריכה
│
├── context/
│   └── UserContext.tsx          # ניהול state משתמש
│
├── data/
│   └── mockRequests.ts          # נתונים דומיים (mock)
│
├── utils/
│   ├── formValidation.ts        # validation וtypes
│   └── slaCalculations.ts       # חישובי SLA
│
├── App.tsx                      # נקודת כניסה
├── main.tsx                     # Bootstrap
└── index.css                    # Tailwind imports
```

---

## איך להריץ את הפרויקט 🚀

### דרישות מקדימות
- Node.js 16+ 
- npm או yarn

### צעדים להתקנה

1. **התקן dependencies**
   ```bash
   npm install
   ```

2. **הרץ את שרת הפיתוח**
   ```bash
   npm run dev
   ```

3. **פתח בדפדפן**
   ```
   http://localhost:5173
   ```

### נתונים demo
- התחברות כיועץ: בחר "🔷 יועץ" בעמוד ההתחברות
- התחברות כעובד ארגון: בחר "👤 עובד ארגון"
- נתונים מלאים כבר בהתקנה

---

## התחברות וניסיון Demo 🎭

### דוגמה 1: כיועץ
1. בחר "🔷 יועץ" בעמוד ההתחברות
2. לחץ על "התחברות"
3. תוכל ליצור בקשות חדשות ולערוך את שלך בלבד

### דוגמה 2: כעובד ארגון
1. בחר "👤 עובד ארגון" בעמוד ההתחברות
2. לחץ על "התחברות"
3. אתה רואה את כל הבקשות ויכול לשנות סטטוס
4. לחץ על "ניטור SLA" כדי לראות בקשות חריגות

---

## מבנה Data 📋

כל בקשה תשלום מכילה:

```typescript
interface PaymentRequest {
  id: string                    // מזהה ייחודי (REQ-001)
  title: string                 // שם הבקשה
  requestor: string             // שם היועץ
  consultantId: string          // ת.ז./ח.פ.
  department: string            // יחידה ארגונית
  project: string               // שם הפרויקט
  description: string           // תיאור העבודה
  startDate: string             // תאריך התחלה
  endDate: string               // תאריך סיום
  amount: number                // סכום בש"ח
  invoiceFile: string | null    // שם קובץ חשבוניה
  status: RequestStatus         // סטטוס נוכחי
  priority: Priority            // עדיפות
  date: string                  // תאריך היצירה
}
```

---


## שפות

- ✅ עברית (Hebrew) - RTL complete

---

**נוצר עם ❤️ עבור ניהול חכם של בקשות תשלום**

# 🤖 AI Prompts Documentation

מסמך זה מרכז את הפרומפטים ששימשו לבניית המערכת, כולל יצירת UI, נתוני דמו וביצוע Code Review.

---

## 🧩 1. פרומפט ראשוני – יצירת המערכת (Lovable)

```
Act as a Senior Frontend Engineer. 

Create a Payment Request Management System using React, Tailwind CSS, and Lucide React icons. 

Use Hebrew UI (RTL layout) suitable for a government organization. 

Design Requirements:

- Modern, minimalistic, fully responsive design.
- Blue tones suitable for a professional organization.
- Use 'Inter' font throughout.
- Include sidebar navigation between screens.
- Include toggle at the top to switch between "Consultant View" and "Employee View".

Functionality:

1. User Role Toggle:
- Consultant sees only their own requests, can submit new requests and edit drafts.
- Employee sees all requests, can approve, reject, or request clarification.
- Toggle should be functional at any time during the session.

2. Home / Request List:
- Table columns: Request ID (מספר בקשה), Consultant Name (שם יועץ), Submission Date (תאריך הגשה), Status (סטטוס, colored), Amount (סכום), Department (יחידה), Days in System (ימים במערכת).
- Filter by status, search functionality.
- Highlight requests over 90 days in red.
- Include 10 sample requests with varied statuses and dates.

3. New Request Form:
- Fields: Consultant Name (שם יועץ), ID number (ת.ז./ח.פ.), Department dropdown (יחידה ארגונית), Project (פרויקט), Work Description (תיאור העבודה), Start Date, End Date, Amount (סכום), Upload Invoice (simulated).
- Buttons: Save as Draft (שמור כטיוטה), Submit (שלח לבדיקה).
- Validation on required fields.

4. Request Processing Screen (Employee):
- View request details and attached file (simulated).
- Comments field (הערות).
- Buttons: Approve (אשר לתשלום), Reject (דחה), Request Clarification (בקש הבהרה).
- Show action history log.

5. SLA Dashboard:
- Summary cards: Total requests, Pending, Over 90 days, Approved this month.
- Pie chart showing distribution by status.
- Lists of requests exceeding 90 days (red alert) and “stuck” requests (awaiting clarification over 14 days).

6. Statuses with colors:
- Draft (טיוטה) – gray
- Under Review (בבדיקה) – blue
- Awaiting Clarification (ממתין להבהרות) – orange
- Approved (אושר לתשלום) – green
- Rejected (נדחה) – red

Additional Requirements:
- Include realistic mock data for all tables (no empty placeholders).
- Add hover states for interactive elements.
- Ensure the code is modular, clean, and reusable.
- Use varied dates to demonstrate SLA logic.
- Include responsive layout for desktop and mobile.

Create the full interactive prototype with all screens, role toggle, and sample requests.
```

---

## 📊 2. פרומפט ליצירת נתוני דמו (Mock Data)

```
תייצר מערך JSON של 10 רשומות ריאליסטיות עבור אפליקציית ניהול בקשות תשלום.

כל אובייקט צריך לכלול את השדות הבאים:
- id: string (UUID או REQ-XXX)
- title: string (שם הבקשה)
- requestor: string (שם היועץ)
- consultantId: string (ת.ז./ח.פ.)
- department: string (יחידה ארגונית)
- project: string (שם הפרויקט)
- description: string (תיאור העבודה)
- startDate: string (תאריך התחלה)
- endDate: string (תאריך סיום)
- amount: number (סכום בש"ח)
- invoiceFile: string | null (קובץ חשבונית)
- status: RequestStatus
- priority: Priority
- date: string (תאריך יצירה)

דרישות:
- הנתונים צריכים להיות מגוונים וריאליסטיים
- לכלול סטטוסים שונים (טיוטה, בבדיקה, ממתין להבהרות, אושר, נדחה)
- לכלול מקרי קצה:
  - בקשות מעל 90 ימים
  - בקשות "תקועות" (ממתין להבהרות מעל 14 ימים)
- להשתמש בתאריכים שונים כדי להדגים SLA
```

---

## 🔍 3. פרומפט ל־Code Review

```
תפעל כמו Senior Frontend Developer קשוח.

תבצע Code Review לקובץ הנוכחי.

בדוק את התחומים הבאים:
1. ביצועי React:
- רינדורים מיותרים
- שימוש לא נכון ב-state
- useEffect מיותר או לא אופטימלי

2. שימוש חוזר בקומפוננטות:
- כפילויות בקוד
- קלאסים חוזרים של Tailwind שניתן להוציא לקומפוננטה

3. Tailwind:
- קלאסים כפולים או סותרים
- רשימות קלאסים ארוכות ולא קריאות

4.   נגישות (a11y):
- חוסר ב־aria attributes
- בעיות semantic HTML
- חוסר בתמיכה במקלדת

הנחיות:
- תחזיר בדיוק 3 הערות בלבד
- לכל הערה:
  - מה הבעיה
  - למה זה חשוב
  - איך לשפר

אל תשכתב את כל הקוד.
אל תיתן הערות כלליות – תהיה ספציפי.
```