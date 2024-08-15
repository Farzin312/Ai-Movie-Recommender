import { queryLLaMA } from '../../utils/llama';
import { retrieveDocument } from '../../utils/retrieval';

export async function POST(req) {
  try {
    const { query } = await req.json();
    console.log('Received query:', query);

    // Retrieve the most relevant movie information
    const { title, content } = await retrieveDocument(query);
    console.log('Retrieved document:', { title, content });

    // Construct the messages for LLaMA
    const messages = [
      { role: 'system', content: 'You are a helpful movie assistant.' },
      { role: 'user', content: query },
      { role: 'system', content: `Based on the movie '${title}', here is what I found: ${content}. How can I assist further?` }
    ];
    console.log('Constructed messages:', messages);

    // Get the response from LLaMA
    const response = await queryLLaMA(messages);

    // Extract the message content from LLaMA response
    const contentMessage = response.choices[0].message?.content;
    console.log('Extracted message content:', contentMessage);

    // Return a successful response
    return new Response(JSON.stringify({ content: contentMessage }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error handling request:', error);

    // Return an error response
    return new Response(JSON.stringify({ error: 'Error handling request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
