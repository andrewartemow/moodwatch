import { useNavigate } from 'react-router-dom';

interface HeaderInterface {
  logo: string;
}

const Header = ({ logo }: HeaderInterface) => {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 z-50 w-full text-center p-3">
      <span
        className="text-primary text-xl font-bold cursor-pointer flex justify-center items-start"
        onClick={() => navigate('/')}
      >
        <img
          src="https://static-00.iconduck.com/assets.00/popcorn-emoji-492x512-rszsmz15.png"
          alt="🍿"
          width={20}
        />
        {logo}
      </span>
    </header>
  );
};

export default Header;
