"use server"

const sendMessage = async (messages: { role: string; content: string }[]) => {
    const url = "https://openrouter.ai/api/v1/chat/completions";
  const headers = {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
  };
  const payload = {
"model": process.env.OPENROUTER_MODEL,
"messages": [
  {
    "role": "system",
    "content": `
      When you want to group detailed information, code, or sub-topics into an optional accordion/collapsible section, you must use the following custom structural tags:

      [COLLAPSIBLE: **Your Header Title Here**]
      Put the details, text, lists, or code blocks that should be hidden inside here.
      [/COLLAPSIBLE]

      Rules:
      1. Always put double asterisks around the header title text inside the opening tag.
      2. Every opening [COLLAPSIBLE: ...] tag MUST have a matching closing [/COLLAPSIBLE] tag.
      3. You can place standard text or other collapsible blocks before or after this section.
      `
  },
  ...messages
]
}

  const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
  });

  const data = await response.json();
  console.log(payload.messages)
  return data.choices[0].message.content;
}

export { sendMessage }