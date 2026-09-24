EVS INTERACTIVE QUIZ — QUICK START

1. Extract this ZIP into a folder, e.g. Desktop\EVS-Quiz.
2. Open the folder in Visual Studio Code.
3. Install the VS Code extension "Live Server" (Ritwick Dey).
4. Right-click index.html → Open with Live Server.
   (Do not just double-click index.html; fetch() may be blocked by the browser.)
5. The quiz loads questions from questions.json.

HOW TO ADD YOUR 160 MCQs
Open questions.json. Each question must follow this structure:
{
  "question": "Your question?",
  "options": ["Choice A", "Choice B", "Choice C", "Choice D"],
  "answer": 2,
  "explanation": "Why choice C is correct."
}
IMPORTANT: answer uses zero-based numbering:
0 = first option (A), 1 = second (B), 2 = third (C), 3 = fourth (D).

This package contains 2 example questions and 158 clearly marked placeholders.
Replace placeholders with your actual questions and correct answers. Keep valid JSON:
- Double quotes around text
- Commas between items
- No comma after the final item
- Exactly four options per question

You can add more or fewer questions; the app automatically reads the number in questions.json.
To share online later, upload the folder to a static host such as GitHub Pages or Netlify.
