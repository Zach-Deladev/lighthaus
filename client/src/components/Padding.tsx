interface PaddingProps {
  children: React.ReactNode;
}

const Padding: React.FC<PaddingProps> = ({ children }) => {
  return (
    <div className="mx-auto my-24 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">{children}</div>
    </div>
  );
};

export default Padding;
