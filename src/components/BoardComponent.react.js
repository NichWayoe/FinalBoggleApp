import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function BoardComponent(props): React.MixedElement | Null {
  const grid = props.grid; 
  const board = () => {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      let cols = [];
      for (var j = 0; j < grid[i].length; j++) {
        cols.push(<Col as="button">{grid[i][j]}</Col>);
      }
      rows.push(
        <Row lg="5" sm={5}>
          {cols}{" "}
        </Row>
      );
    }
    return rows;
  };
  return (
    <div>
    
      <Container fluid="md">{board()}</Container>
    </div>
  );
}
export default BoardComponent;
