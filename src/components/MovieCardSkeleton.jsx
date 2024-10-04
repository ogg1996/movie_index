export default function MovieCardSkeleton() {
  return (
    <div className="w-[200px] h-[400px] rounded-[10px] flex flex-col justify-between">
      <div className="bg-[#dddddd] h-[300px] rounded-[10px]"></div>
      <div className="bg-[#dddddd] ml-[10px] w-[150px] h-[24px] self-start rounded-[5px]"></div>
      <div className="bg-[#dddddd] mr-[10px] mb-[10px] w-[150px] h-[24px] self-end rounded-[5px]"></div>
    </div>
  );
}
