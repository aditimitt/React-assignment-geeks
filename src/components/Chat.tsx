import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { register, handleSubmit, reset } = useForm<{ message: string }>();

  const onSubmit = async (data: { message: string }) => {
    const newMessage: Message = {
      id: Date.now(),
      text: data.message,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);
    reset();

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: 'Bot response here', sender: 'bot' },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-2 mb-2 rounded-lg ${
              msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex mt-4">
        <input
          type="text"
          {...register('message', { required: true })}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg"
          placeholder="Type a message"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
