import { useNavigate } from "react-router-dom";
import supabase from "../scripts/supabaseClient";

export default function Join() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    const namePattern = /^[a-zA-Z가-힣0-9]{2,8}$/;
    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/;

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("빈 입력란이 존재합니다!");
      return;
    }

    if (!namePattern.test(name)) {
      alert(
        "Name의 입력 양식이 올바르지 않습니다!\n(대소문자, 한글, 숫자 2~8자 조합)"
      );
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

    if (password !== confirmPassword) {
      alert("Password와 confirmPassword가 일치하지 않습니다!");
      return;
    }

    await supabase.auth
      .signUp({
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.session === null) {
          alert("회원가입에 실패하였습니다. 다시 시도해 주세요");
        } else {
          alert("회원가입이 완료 되었습니다");
          navigate("/");
        }
      });

    // 회원 가입후 자동로그인 방지
    await supabase.auth.signOut();
  };

  return (
    <form
      className="max-w-[400px] w-[80%] mt-[80px] p-[10px_30px]
      font-bold flex flex-col border-[5px] gap-[20px] rounded-[20px]"
      onSubmit={handleSubmit}
    >
      <div className="text-[24px]">Join</div>
      <div className="flex flex-col">
        <label htmlFor="name" className="self-start">
          Name
        </label>
        <input id="name" name="name" className="border-[2px] pl-[5px]" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="self-start">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border-[2px] pl-[5px]"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="self-start">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border-[2px] pl-[5px]"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmPassword" className="self-start">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="border-[2px] pl-[5px]"
        />
      </div>
      <button
        type="submit"
        className="bg-gray-300 h-[50px] text-[30px] rounded-[20px] hover:animate-pulse"
      >
        Join
      </button>
    </form>
  );
}
