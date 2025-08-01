import { ProfessionalExperience } from "@entities/resumes/ResumeTemplate1/api/types";

type JobExperience = {
    company: string,
    project: string,
    startWork: string,
    endWork: string,
}

export type GenerateResumePromptProps = {
    name: string,
    // surname: string,
    role: string,
    education?: string,
    location?: string,
    email: string,
    experience?: number
    experienceList: ProfessionalExperience[]
}

function generateResumePrompt({
    name, role, education, location, email, experience, experienceList,
}: GenerateResumePromptProps) {
    return `
Ты — профессиональный HR-ассистент, который помогает составлять резюме в строгом JSON-формате.

ВНИМАНИЕ: Все поля в JSON должны быть заполнены на основе данных кандидата выше. Не пропускай ни одного поля. Покажи пример с заполненными значениями.

### Инструкции:
1. Если поле не указано (undefined), оставь его пустым ("").
2. Структурируй опыт работы так, чтобы он был читаемым и подходил под ATS (Applicant Tracking Systems).
3. Достижения (achievements) должны быть конкретными и измеримыми (например, "Увеличил конверсию на 20%").
4. Summary (краткое описание) — 3-5 предложений о профессиональных качествах.
5. Навыки (skills) — перечисли через запятую (например, "Python, Docker, Agile").
6. Напиши от первого лица (Я обладаю, меня назначили ответственным, я занимал должность, я возглавлял команду разработки и пр).

### Данные кандидата:
- Имя: ${name || "Не указано"}
- Должность: ${role || "Не указано"}
- Образование: ${education || "Не указано"}
- Местоположение: ${location || "Не указано"}
- Email: ${email || "Не указано"}
- Опыт работы: ${experience || "0"} лет
- История работы:
${experienceList.map(item => `  - ${item.name || "Компания не указана"}: ${item.role || "Должность"} (${item.startWork || "?"} — ${item.endWork || "?"})`).join('\n')}

### Пример требуемого ответа (JSON):
{
  "name": "Иван Иванов",
  "role": "Frontend Developer",
  "experience": "3 года",
  "education": "МГУ, Прикладная математика",
  "location": "Москва, Россия",
  "email": "ivan.ivanov@email.com",
  "phoneNumber": "",
  "summary": "Я обладаю опытом в разработке SPA-приложений на React и TypeScript. Умею работать в команде, быстро обучаюсь новым технологиям. За время работы увеличил производительность проекта на 30%.",
  "skills": ["React", "TypeScript", "Redux", "HTML", "CSS", "Git"],
  "professionalPath": [
    {
      "name": "ООО Рога и Копыта",
      "role": "Frontend Developer",
      "description": "Я занимался разработкой пользовательских интерфейсов, внедрял новые фичи и оптимизировал существующий код.",
      "startWork": "01-01-2021",
      "endWork": "настоящее время",
      "achievements": ["Внедрил SSR, что ускорило загрузку на 40%"],
      "responsibilities": ["Разработка UI", "Код-ревью", "Внедрение новых библиотек"]
    }
  ]
}

Дополнительные указания:
Для дат используй формат дд-мм-гггг (например, 01-05-2022).
Если период работы текущий, укажи "endWork": "настоящее время".
Сделай резюме на русском языке, если не указано иное.
`;
}

export {
    generateResumePrompt
}