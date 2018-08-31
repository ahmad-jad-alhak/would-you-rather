import React from 'react'
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';
import { Link } from 'react-router-dom'

const NoFound = () => {
    return (
        <div className="notFound">
            <Col>
                <Card body>
                    <CardTitle>Page not Found</CardTitle>
                    <CardText>We couldn't find the page your are looking for.</CardText>
                    <Link to="/"> 
                     <Button>Go to the home page</Button>
                    </Link>
                </Card>
            </Col>
        </div>
    )
}

export default NoFound;