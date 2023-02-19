import { useState, useMemo } from 'react'
import { Row, Col, ToggleButton, Form, InputGroup, Container, Stack, Card } from 'react-bootstrap';
import { Genders, Units, OlympicPlate, OlympicPlates} from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Converter } from './util';
import { faDumbbell, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { Plates } from './components/Plates';
import './App.css'

const App = () => {
  const [targetWeight, setTargetWeight] = useState(100.0);
  const [gender, setGender] = useState(0);
  const [unit, setUnit] = useState(0);

  const sortedPlates : OlympicPlate[] = useMemo(() => {
    return OlympicPlates.sort((l, r) => {
      if(l.value > r.value) return -1;
      else if(l.value < r.value) return 1;
      else return 0;
    })
  }, [OlympicPlates]);

  const barbellWeight : number = useMemo(() => gender === 0? 20 : 15, [gender]);

  const targetWeightInKg : number = useMemo(() => unit === 0? targetWeight : Converter.LbsToKgs(targetWeight), [targetWeight, unit]);
  
  const eachSidePlates: OlympicPlate[] = useMemo(() => {
    if(targetWeightInKg <= barbellWeight) return [];
    
    const eachSide = (targetWeightInKg - barbellWeight) / 2;
    
    const mountedPlates : OlympicPlate[] = [];
    let mountedTotal = 0;

    while(mountedTotal !== eachSide) {
      let remaining = eachSide - mountedTotal;
      let mounted = false;

      for(let p of sortedPlates) {
        if(p.value <= remaining) {
          mountedPlates.push(p);
          mounted = true;
          break;
        }
      }

      if(mounted) mountedTotal = mountedPlates.map(p => p.value).reduce((acc, curr) => acc + curr);
      else break;
    }

    return mountedPlates;
  }, [targetWeightInKg, gender]);

  const totalMounted : number = useMemo(() => {
    const mountedInKg = eachSidePlates.length > 0 ? (eachSidePlates.map(p => p.value).reduce((acc, curr) => acc + curr) * 2) + barbellWeight : barbellWeight;
    return unit === 0? mountedInKg : Converter.KgsToLbs(mountedInKg);
  }, [eachSidePlates, unit]);

  const correctMount : boolean = useMemo(() => {
    const target = unit === 0? targetWeight : Converter.LbsToKgs(targetWeight);
    console.log(target, totalMounted);
    return Math.round(totalMounted) === Math.round(target);
  }, [unit, eachSidePlates]);

  return (
    <Container className="App">
      <Card className='barbell-mate'>
        <Card.Header>Barbell Mate</Card.Header>
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text><FontAwesomeIcon icon={faDumbbell} /></InputGroup.Text>
            <Form.Control
              type="number"
              name='targetWeight'
              value={targetWeight}
              onChange={(e) => {
                let _weight = parseFloat(e.currentTarget.value);

                if(_weight < 0 || NaN || !_weight) _weight = 0;

                setTargetWeight(_weight);
              }}
            />
              {Units.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`unit-${idx}`}
                  type="radio"
                  variant={"outline-secondary"}
                  name="unitRadio"
                  value={radio.value}
                  checked={unit === radio.value}
                  onChange={(e) => setUnit(parseInt(e.currentTarget.value))}
                >
                  {radio.name}
                </ToggleButton>
              ))}
          </InputGroup>
          <InputGroup>
            <InputGroup.Text><FontAwesomeIcon icon={faVenusMars} /></InputGroup.Text>
            {Genders.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`gender-${idx}`}
                type="radio"
                variant={"outline-secondary"}
                name="genderRadio"
                value={radio.value}
                checked={gender === radio.value}
                onChange={(e) => setGender(parseInt(e.currentTarget.value))}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </InputGroup>
      <Row className='barbell-row nested-row'>
        <Col>
          <Plates plates={eachSidePlates} position={"l"}></Plates>
        </Col>
        <Col className={"total-weight"}>
          <h2>
            {totalMounted}
          </h2>
          {!correctMount && <p><del>{targetWeight}</del></p>}
        </Col>
        <Col className="d-none d-sm-block">
          <Plates plates={eachSidePlates} position={"r"}></Plates>
        </Col>
      </Row>
        </Card.Body>
        <Card.Footer><small className='text-muted'>Let Barbell Mate help on your workout!</small></Card.Footer>
      </Card>
      
    </Container>
  );
};

export default App