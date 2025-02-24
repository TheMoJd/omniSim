import React, { useState } from 'react';
import { sendMessageToPersona } from '../api//conversations';

interface ChatBoxProps {
  personaId: string;
  personaName: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ personaId, personaName }) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const { personaResponse } = await sendMessageToPersona(personaId, personaName, input);
      setMessages((prev) => [...prev, { sender: 'persona', text: personaResponse }]);
    } catch (error) {
      console.error("Erreur d'envoi:", error);
    }

    setInput('');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="h-40 overflow-y-auto mb-2 p-2 border rounded-lg bg-white dark:bg-gray-900">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-500 text-white ml-auto' : 'bg-gray-300'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez une question..."
        />
        <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
