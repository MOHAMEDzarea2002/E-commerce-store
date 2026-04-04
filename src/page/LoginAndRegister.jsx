import { useState } from "react";

function LoginAndRegister() {

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(mode, form);

  };

  const isLogin = mode === "login";

  return (
    <div  className="flex justify-center items-center bg-gray-100">
      <div style={styles} className="bg-white p-4 rounded-2xl flex flex-col w-75 gap-6">
        <h2 style={styles.title} className="text-center mb-5" >{isLogin ? "تسجيل الدخول" : "إنشاء حساب"}</h2>

        {!isLogin && (
          <input
                   className="p-2 border-2 border-gray-200 focus:border-blue-200 outline-none rounded-lg duration-200 ease-in"

            name="name"
            placeholder="الاسم"
            value={form.name}
            onChange={handleChange}
          />
        )}

        <input
 
         className="p-2 border-2 border-gray-200 focus:border-blue-200 outline-none rounded-lg duration-200 ease-in"

          name="email"
          type="email"
          placeholder="البريد الإلكتروني"
          value={form.email}
          onChange={handleChange}
        />

        <input
 
         className="p-2 border-2 border-gray-200 focus:border-blue-200 outline-none rounded-lg duration-200 ease-in"

          name="password"
          type="password"
          placeholder="كلمة المرور"
          value={form.password}
          onChange={handleChange}
        />

        <button  onClick={handleSubmit}

        className="p-2 bg-blue-500 rounded-lg text-white cursor-pointer "
        >
          {isLogin ? "دخول" : "إنشاء حساب"}
        </button>

        <p className="text-center text-base">
          {isLogin ? "ما عندك حساب؟" : "عندك حساب؟"}{" "}
          <span
           className="text-blue-500  cursor-pointer"
            onClick={() => setMode(isLogin ? "register" : "login")}
          >
            {isLogin ? "سجّل الآن" : "سجّل دخول"}
          </span>
        </p>
        
      </div>
    </div>
  );
}

const styles = {




  toggle: { textAlign: "center", fontSize: "13px", color: "#555" },
  link: { color: "#4f46e5", cursor: "pointer", fontWeight: "bold" },
};

export default LoginAndRegister;
