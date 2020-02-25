interface Branch {
  id: string;
  companyId: string;
  name: string;
  createdAt: string;
}

export default function Branch(_: RouteComponentProps) {
  const [name, setName] = React.useState("");
  const [companyID, setCompanyID] = React.useState("");
  const [listBranch, setListBranch] = React.useState([] as Branch[]);
  React.useEffect(() => {
    const init = async () => {
      const res = await axios.post(
        GRAPH_QL_ENDPOINT,
        {
          query: `
            query {
              listBranch {
                id,
                name,
                createdAt
              }
            }
            `
        },
        {
          headers: {
            "Content-Type": "application/graphql",
            "x-api-key": APPSYNC_API_KEY
          }
        }
      );
      console.info("res", res.data.data.listBranch);
      setListBranch(res.data.data.listBranch);
    };
    init();
  }, []);
  return (
    <div>
      <h2>User</h2>
      {listBranch.map(branch => {
        return (
          <p>
            {branch.id}: {branch.name}
          </p>
        );
      })}
      <input value={name} onChange={e => setName(e.target.value)} />
      {/* <button onClick={() => createUser(name)}>CREATE USER</button> */}
    </div>
  );
}
