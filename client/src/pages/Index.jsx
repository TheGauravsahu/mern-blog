import Card from "../components/card";

const Index = () => {
  return (
    <div className="flex items-center flex-wrap gap-6 px-8 pb-4 justify-center md:justify-normal">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
        <Card />
      ))}
    </div>
  );
};

export default Index;
