export default function TextToBookFAB() {
  return (
    <a
      href="sms:+14165550168?body=Hi%20Iron%20%26%20Amber%2C%20I’d%20like%20to%20book%20a%20detail."
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-black font-bold px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
      </svg>
      Text to Book
    </a>
  );
}
