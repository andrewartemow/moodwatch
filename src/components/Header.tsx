import { useNavigate } from 'react-router-dom';

interface HeaderInterface {
  logo: string;
}

const Header = ({ logo }: HeaderInterface) => {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 z-50 w-full text-center p-3">
      <span
        className="text-primary text-xl font-bold cursor-pointer"
        onClick={() => navigate('/')}
      >
        &#127871;{logo}
      </span>
    </header>
  );
};

export default Header;
