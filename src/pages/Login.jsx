export default function Login() {
  return (
    <form
      className="max-w-[400px] w-[80%] mt-[80px] p-[10px_30px] font-bold
      flex flex-col border-[5px] gap-[10px]"
    >
      <div className="text-[24px]">Login</div>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" className="border-[2px] pl-[5px]" />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" className="border-[2px] pl-[5px]" />
      <button type="submit" className="bg-gray-300">
        Login
      </button>
    </form>
  );
}
