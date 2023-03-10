import { QueryClient, QueryClientProvider } from "react-query";
import Query from "./Query";

const queryClient = new QueryClient();
//   {
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false, // window focus 설정
//     },
//   },
// }

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Query />
    </QueryClientProvider>
  );
}

export default App;
