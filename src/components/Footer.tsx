const Footer = () => {
  return (
    <footer className="w-full absolute bottom-0 p-3">
      <span className="flex w-full items-center justify-center gap-1 font-bold">
        Made with{' '}
        <img
          src="https://static-00.iconduck.com/assets.00/popcorn-emoji-492x512-rszsmz15.png"
          alt="🍿"
          width={20}
        />{' '}
        by{' '}
        <a
          className="text-secondary underline"
          href="https://x.com/artemowandrei"
        >
          Andrei
        </a>{' '}
        <img
          className="rounded-full w-10 h-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5fbAIP2vel6ypS0JfFZ7KvgSsYQanU4vH1A&s"
          alt=""
        />
      </span>
    </footer>
  );
};

export default Footer;
