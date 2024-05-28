import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider';

const ChatBot = () => {
    const { setChatModalOpen } = useStateContext(); // Предположим, что у вас есть контекст с функцией для открытия/закрытия модального окна чата
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        // Здесь можно добавить логику для отправки сообщения
        // Например, добавить новое сообщение в массив messages
        setMessages([...messages, { text: message, sender: 'user' }]);
        // Очистка поля ввода после отправки сообщения
        setMessage('');
    };

    return (
        <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
            <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] w-400">
                <div className="flex justify-between items-center p-4 ml-4">
                    <p className="font-semibold text-lg">Чат</p>
                    <button
                        type="button"
                        onClick={() => setChatModalOpen(false)} // Здесь вызываем функцию для закрытия модального окна чата
                        style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
                        className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <MdOutlineCancel />
                    </button>
                </div>
                <div className="p-4">
                    {/* Здесь выводим сообщения чата */}
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t-1 border-color">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                        className="w-full p-2 border-1 border-gray-300 rounded"
                    />
                    <button
                        type="button"
                        onClick={sendMessage}
                        className="mt-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                    >
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
