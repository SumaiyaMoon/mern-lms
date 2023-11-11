type SMTableRowProps = {
  keyIndex: any;
  Id?: number | string;
  Name?: string;
  Logo?: any;
  Number?: string;
  Active?: any;
  Email?: any;
  onClick?: any;
};
export default function SMTableRow(props: SMTableRowProps) {
  const { keyIndex, Id, Name, Logo, Number, Active, Email, onClick } = props;
  return (
    <>
      <tr key={keyIndex} onClick={onClick}>
        <td>{Id}</td>
        {/* <td>{Logo}</td> */}
        <td>{Name}</td>
        {/* <td>{Number}</td> */}
        <td>{Email}</td>
        <td>{Active}</td>
      </tr>
    </>
  );
}
