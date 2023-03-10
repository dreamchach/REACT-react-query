# react-query

## useQuery

```javascript
const { isLoading, error, data } = useQuery(
  "repoData",
  () =>
    fetch("/data").then(
      (res) => {
        console.log("res", res);
        return res.json();
      }
      // {
      //   params: {
      //     id: id,
      //   },
      // }
    ),
  {
    staleTime: 5000,
    cacheTime: 5000,
    //   enabled: !!id
  }
);
```

### 정의

- react-query를 이용해 서버로 부터 데이터를 조회해올 때 사용합니다.
  > 데이터 조회가 이닌 데이터 변경 작업 시에는 `useMutation`을 사용합니다.

### useQuery의 기본 형태

```javascript
// 1
const res = useQuery(queryKey, queryFn);

// 2
const res = useQuery({
  queryKey: queryKey,
  queryFn: queryFn,
});
```

### queryKey

- useQuery마다 부여되는 고유 Key 값입니다.
  -queryKey값으로 `['persons', 'add Id']`와 `['add Id', 'persons']`는 다릅니다.

### queryFn

- query Function의 약자로 **promise 처리가 이루어지는 함수**를 뜻합니다.

### staleTime

- 데이터가 `fresh` => `stale` 상태로 변경되는데 걸리는 시간

## chcheTime

- 데이터가 `inactive` 상태일 때 캐싱된 상태로 남아있는 시간
- `chcheTime`이 지나면 가비지 콜렉터로 수집된다.
- `cacheTime`이 지나기 전에 쿼리 인스턴스가 다시 mount되면 데이터를 fetch하는 동안 캐시 데이터를 보여준다.

```javascript
// 1
const res = useQuery(queryKey, queryFn, {
  staleTime: 0(기본값),
  chcheTime: 300000(기본값), // 5분
});

// 2
const res = useQuery({
  queryKey: queryKey,
  queryFn: queryFn,
  staleTime: 0,
  chcheTime: 300000,
});
```

### refetch on window focus

- 단순 페이지 전환으로 refetch여부를 결정
- `refetchOnWindowFocus`가 `false`일 때, `staleTime`이 지나도 `focus`가 다시 되는 것만으로 `refetch` 발생 여부를 설정

```javascript
// 전역적 설정
// index.js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// useQuery마다 설정
// 1
const res = useQuery(queryKey, queryFn, {
  refetchOnWindowFocus: false,
});

// 2
const res = useQuery({
  queryKey: queryKey,
  queryFn: queryFn,
  refetchOnWindowFocus: false,
});
```

### enabled

- 조건의 여부에 따라 서버에 데이터를 요청하도록 하는 기능

```javascript
// 비교군 코드(동일한 결과)
if (id) {
  const res = axios.get("/data", {
    params: {
      id: id,
    },
  });
}

// 1
const res = useQuery(
  queryKey,
  () =>
    axios.get("/data", {
      params: {
        id: id,
      },
    }),
  {
    enabled: !!id,
  }
);

// 2
const res1 = useQuery({
  queryKey: queryKey,
  queryFn: () =>
    axios.get("/data", {
      params: {
        id: id,
      },
    }),
  enabled: !!id,
});
```

## useMutation

### 정의

- `useMutation`은 react-query를 이용해 서버에 데이터 변경 작업을 요청할 때 사용합니다.
- 데이터 조회를 할 때는 `useQuery`를 사용합니다.

### useMutation 기본 구조

```javascript
// 1
const res = useMutation(mutationFn);

// 2
const res = useMutation({
  mutationFn: mutationFn,
});
```

### mutationFn

- `mutationFn`은 `mutation Funtion`의 약자로 *promise 처리가 이루어지는 함수*입니다.

```javascript
// 1
const preOnClick = useMutation((value) => {
  return axios.post("/data", value);
});

// 2
const preOnClick = useMutation({
  mutationFn: (value) => {
    return axios.post("/data", value);
  },
});
```

### mutate

- `mutate`는 **`useMutation`을 이용해 작성한 내용들이 실행될 수 있도록 도와주는 trigger 역할**을 합니다.
- `useMutation`을 정의해둔 뒤, 이벤트가 발생되었을 때 `mutate`를 사용해주면 됩니다.

```javascript
  const preOnClick = useMutation((value) => {
      return axios.post("/data", value);
    });

  const onClick = () => {
    preOnClick.mutate(value);
  };

...
<input type="text" value={value}/>
<button type="button" onClick={onClick}>
    데이터 추가
</button>
```

### onSuccess, onError, onSettled

```javascript
const res = useMutation(mutationFn, {
  // 요청이 성공한 경우
  onSuccess: () => {
    console.log("onSuccess");
  },
  // 요청에 에러가 발생된 경우
  onError: (error) => {
    console.log("onError");
  },
  // 요청이 성공하든, 에러가 발생되든 실행하고 싶은 경우
  onSettled: () => {
    console.log("onSettled");
  },
});
```

- `mutate`에서도 사용가능합니다.

```javascript
const onClick = () => {
  preOnClick.mutate(value, {
    onSuccess: () => {
      console.log("onSuccess");
    },
    onError: (error) => {
      console.log("onError");
    },
    onSettled: () => {
      console.log("onSettled");
    },
  });
};
```

### invalidateQueries

- `invalidateQueries`는 `useQuery`에서 사용되는 `queryKey`의 유효성을 제거해서 **서버로부터 다시 데이터를 조회해오기 위해서입니다.**

```javascript
// 1. 등록된 queryClient를 가져오기
const queryClient = new QueryClient();

const res = useMutation(mutationFn, {
  onSuccess: () => {
    console.log("onSuccess");
    queryClient.invalidateQueries("queryKey");
  },
  onError: (error) => {
    console.log("onError");
  },
  onSettled: () => {
    console.log("onSettled");
  },
});
```
