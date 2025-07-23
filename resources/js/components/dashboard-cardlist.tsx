import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";


const popularContent = [
  {
    id: 1,
    title: "Laskar Pelangi",
    badge: "Fiksi",
    image:
      "https://images.pexels.com/photos/5904935/pexels-photo-5904935.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 430, // jumlah dipinjam
  },
  {
    id: 2,
    title: "Sapiens: A Brief History",
    badge: "Sejarah",
    image:
      "https://images.pexels.com/photos/1053689/pexels-photo-1053689.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 380,
  },
  {
    id: 3,
    title: "Atomic Habits",
    badge: "Self Development",
    image:
      "https://images.pexels.com/photos/6947400/pexels-photo-6947400.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 350,
  },
  {
    id: 4,
    title: "Clean Code",
    badge: "Teknologi",
    image:
      "https://images.pexels.com/photos/5904936/pexels-photo-5904936.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 310,
  },
  {
    id: 5,
    title: "Thinking, Fast and Slow",
    badge: "Psikologi",
    image:
      "https://images.pexels.com/photos/5904934/pexels-photo-5904934.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 290,
  },
];

const latestTransactions = [
  {
    id: 1,
    title: "Laskar Pelangi",
    badge: "Dina Rahma",
    image:
      "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1, // jumlah pinjam (default 1)
  },
  {
    id: 2,
    title: "Atomic Habits",
    badge: "Rafi Ananda",
    image:
      "https://images.pexels.com/photos/1996330/pexels-photo-1996330.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1,
  },
  {
    id: 3,
    title: "Clean Code",
    badge: "Nur Aulia",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1,
  },
  {
    id: 4,
    title: "Sapiens",
    badge: "Bagas Mahendra",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1,
  },
  {
    id: 5,
    title: "Thinking, Fast and Slow",
    badge: "Siti Zahrani",
    image:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1,
  },
];

const DashboardCardList = ({ title }: { title: string }) => {
  const list = title === "Buku Paling Populer" ? popularContent : latestTransactions;
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {list.map((item) => (
          <Card key={item.id} className="flex-row items-center justify-between gap-4 p-4">
            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
              <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <Badge variant="outline">{item.badge}</Badge>
            </CardContent>
            <CardFooter className="p-0 text-sm text-muted-foreground">
              {title === "Buku Paling Populer"
                ? `${item.count}x `
                : `1 buku `}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardCardList;
