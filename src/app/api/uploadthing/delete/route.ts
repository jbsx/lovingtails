export default async function POST(req: Request) {
  console.log(await req.json());
}
