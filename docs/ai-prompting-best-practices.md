# 🧠 AI Prompting Best Practices

To get the best results from AI agents in this codebase, formulate your prompts using these principles:

## 1. Provide Context Upfront
**Bad:** "Build a navigation bar."
**Good:** "Build a responsive navigation bar for the project. It should be a React Server Component by default, use Tailwind CSS 4, and follow the `docs/frontend-standards.md`."

## 2. Specify the Output Format
**Bad:** "Make it look premium."
**Good:** "Apply premium UI standards: use Framer Motion for subtle hover effects, ensure perfect dark/light mode contrast, and follow the accessibility checklist."

## 3. Reference Existing Rules
Always remind the AI to check specific guidelines:
- "Please review `docs/architecture-rules.md` before deciding where to place this state."
- "Ensure the database query follows the standards in `docs/backend-standards.md`."

## 4. Iterative Development
Ask the AI to plan first, then execute:
"First, provide a step-by-step plan for implementing the new contact form schema. Wait for my approval before writing the code."

## 5. Security Reminders
"Write a Server Action to handle this form. Make sure to use Zod to validate the input to prevent injection attacks."
