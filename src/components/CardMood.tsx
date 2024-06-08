interface CardMoodInterface {
  text: string;
  onClick: () => void;
}

const CardMood = ({ text, onClick }: CardMoodInterface) => {
  return (
    <li
      className="btn btn-secondary btn-outline w-40 h-20 font-bold text-primary text-xl text-center"
      onClick={onClick}
    >
      {text}
    </li>
  );
};

export default CardMood;
