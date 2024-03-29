const apiKey = import.meta.env.API_KEY

export async function sendMsgToOpenAI(message) {

     try {
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
               method: "POST",
               headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({
                    "model": "mistralai/mixtral-8x7b-instruct",
                    "messages": [
                         { "role": "user", "content": message },
                    ],
               })
          });

          const data = await response.json();
          const res = data.choices[0].message['content'];
          console.log(res);
          return res;
     } catch (error) {
          console.error('Error:', error);
          throw error;
     }
}