import { Card, Button, CardHeader, CardFooter } from 'reactstrap';




const ImportantLinks = () => {
  return (
    <div>
      <form>
        <span><Card style={{ height: '3rem', background: 'lightgrey', width: '70rem' }}>Home /Important Links
        </Card></span><br />
        <Card>
          <CardHeader>
          <h5>Important Links</h5>

          <Button color="dark">Egrass Site Link</Button>{' '}
          </CardHeader>



          <CardFooter>© 2023 GMDA All rights reserved. Version: 4...</CardFooter>
        </Card>

      </form>
    </div>

  );
}


export default ImportantLinks;