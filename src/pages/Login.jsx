import { useNavigate } from "react-router-dom";
import supabase from "../scripts/supabaseClient";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/;

    if (email.trim() === "" || password.trim() === "") {
      alert("빈 입력란이 존재합니다!");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Email의 입력 양식이 올바르지 않습니다!");
      return;
    }
    if (!passwordPattern.test(password)) {
      alert(
        "Password의 입력 양식이 올바르지 않습니다!\n(대소문자, 숫자, 특수기호 8~15자 조합)"
      );
      return;
    }

    await supabase.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.error !== null) {
          alert("로그인에 실패하였습니다. 다시 시도해 주세요");
        } else {
          alert(`${res.data.user.email}님 환영합니다!`);
          navigate("/");
        }
      });
  };

  const handleKakaoLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: "http://localhost:5173/", // 인증 후 리다이렉트될 로컬 URL
      },
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log(data);
    }
  };

  return (
    <form
      className="max-w-[400px] w-[80%] mt-[80px] p-[10px_30px] font-bold
      flex flex-col border-[5px] gap-[20px] rounded-[20px]"
      onSubmit={handleLogin}
    >
      <div className="text-[24px]">Login</div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          className="border-[2px] pl-[5px]"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="border-[2px] pl-[5px]"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-300 h-[50px] text-[30px] rounded-[20px] hover:animate-pulse"
      >
        Login
      </button>
      <button
        type="button"
        onClick={handleKakaoLogin}
        className="bg-yellow-300 h-[50px] text-[30px] rounded-[20px] hover:animate-pulse"
      >
        Kakao Login
      </button>
    </form>
  );
}
