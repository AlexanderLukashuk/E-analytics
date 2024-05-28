// // SignIn.js
// import React, { useState } from "react";
// import { useAuth } from "./AuthContext";
// import { Link } from "react-router-dom";

// export const metadata = {
//   title: "Вход - Простой",
//   description: "Описание страницы",
// };

// const SignIn = () => {
//   const { signIn } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Здесь вы можете добавить логику проверки учетных данных
//     // и вызвать signIn для аутентификации пользователя
//     signIn({ email, password });
//   };

//   return (
//     <section className="bg-gradient-to-b from-gray-100 to-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="pt-32 pb-12 md:pt-40 md:pb-20">
//           {/* Заголовок страницы */}
//           <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
//             <h1 className="h1">
//               Добро пожаловать. Мы существуем, чтобы упростить
//               предпринимательство.
//             </h1>
//           </div>

//           {/* Форма входа */}
//           <div className="max-w-sm mx-auto">
//             <form onSubmit={handleSubmit}>
//               <div className="flex flex-wrap -mx-3 mb-4">
//                 <div className="w-full px-3">
//                   <label
//                     className="block text-gray-800 text-sm font-medium mb-1"
//                     htmlFor="email"
//                   >
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     type="email"
//                     className="form-input w-full text-gray-800"
//                     placeholder="Введите ваш адрес электронной почты"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-wrap -mx-3 mb-4">
//                 <div className="w-full px-3">
//                   <div className="flex justify-between">
//                     <label
//                       className="block text-gray-800 text-sm font-medium mb-1"
//                       htmlFor="password"
//                     >
//                       Пароль
//                     </label>
//                     <Link
//                       to="/reset-password"
//                       className="text-sm font-medium text-blue-600 hover:underline"
//                     >
//                       Забыли пароль?
//                     </Link>
//                   </div>
//                   <input
//                     id="password"
//                     type="password"
//                     className="form-input w-full text-gray-800"
//                     placeholder="Введите ваш пароль"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-wrap -mx-3 mb-4">
//                 <div className="w-full px-3">
//                   <div className="flex justify-between">
//                     <label className="flex items-center">
//                       <input type="checkbox" className="form-checkbox" />
//                       <span className="text-gray-600 ml-2">
//                         Оставаться в системе
//                       </span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-wrap -mx-3 mt-6">
//                 <div className="w-full px-3">
//                   <Link
//                     to="/ecommerce"
//                     type="submit"
//                     className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
//                   >
//                     Войти
//                   </Link>
//                 </div>
//               </div>
//             </form>
//             {/* Дополнительные варианты входа */}
//             <div className="flex items-center my-6">
//               <div
//                 className="border-t border-gray-300 grow mr-3"
//                 aria-hidden="true"
//               ></div>
//               <div className="text-gray-600 italic">Или</div>
//               <div
//                 className="border-t border-gray-300 grow ml-3"
//                 aria-hidden="true"
//               ></div>
//             </div>
//             {/* Ваши кнопки входа через GitHub и Google */}
//             {/* Форма регистрации */}
//             <div className="text-gray-600 text-center mt-6">
//               Нет аккаунта?{" "}
//               <Link
//                 to="/signup"
//                 className="text-blue-600 hover:underline transition duration-150 ease-in-out"
//               >
//                 Зарегистрируйтесь
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignIn;
