import React from 'react';
import {
  Table,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'reactstrap';

import MenuBar from '~components/MenuBar';

function CollectRetroactive() {
  return (
    <>
      <MenuBar subMenu="" />
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '90%', display: 'inline-block' }}>
          <Form style={{ padding: 30 }}>
            <Row form>
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>고객명</InputGroupText>
                  </InputGroupAddon>
                  <Input type="text" name="customerId" id="customerId" />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>수집방법</InputGroupText>
                  </InputGroupAddon>
                  <Input type="select" name="collectType" id="collectType" />
                </InputGroup>
              </Col>
              <FormGroup check row>
                <Col>
                  <Button>검색</Button>
                </Col>
              </FormGroup>
            </Row>
          </Form>

          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default CollectRetroactive;
