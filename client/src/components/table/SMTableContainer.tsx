type SMTableContainerProps = {
    
    cols: any[];
    children: any
  }
  export default function SMTableContainer(props: SMTableContainerProps) {
    const { cols, children } = props;
    return (
        <div>
            <table className="table table-striped w-100 table-bordered border-success">
                <thead>
                    <tr>
                        {cols.map((x, i) => (
                            <th>{x.heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* {datasource.map((row, i) => (
                        <tr>
                            {cols.map((col, ind) => (
                                <td>{row[col.key]}</td>
                            ))}
                        </tr>
                    ))} */}
  {children}
                </tbody>
            </table>
        </div>
    );
  }