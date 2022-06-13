import { Button, Table } from "reactstrap";

function PcommentList() {
  return (
    <>
      <Table>
        <tbody>
          <tr>
            <td>
              이름 : content(date)
              <Button>x</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
export default PcommentList;
