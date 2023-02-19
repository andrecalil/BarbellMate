import { useState, useMemo } from 'react'
import { Row, Col, ToggleButton, Form, InputGroup, Container, Stack, Card } from 'react-bootstrap';
import { Genders, Units, OlympicPlate, OlympicPlates} from './TypesAndEnums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import './App.css'

const App = () => {
  const sortedPlates : OlympicPlate[] = useMemo(() => {
    return OlympicPlates.sort((l, r) => {
      if(l.value > r.value) return -1;
      else if(l.value < r.value) return 1;
      else return 0;
    })
  }, [OlympicPlates]);

  const [targetWeight, setTargetWeight] = useState(100.0);
  const [gender, setGender] = useState(0);
  const [unit, setUnit] = useState(0);

  const barbellWeight : number = useMemo(() => gender === 0? 20 : 15, [gender]);
  
  const eachSidePlates = useMemo(() => {
    const target = unit === 0? targetWeight : targetWeight / 2.2;

    if(target <= barbellWeight) return [];
    
    const eachSide = (target - barbellWeight) / 2;
    
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
  }, [targetWeight, unit, gender]);

  const totalMounted : number = useMemo(() => {
    return eachSidePlates.length > 0 ? (eachSidePlates.map(p => p.value).reduce((acc, curr) => acc + curr) * 2) + barbellWeight : barbellWeight;
  }, [eachSidePlates]);

  const correctMount : boolean = useMemo(() => {
    const target = unit === 0? targetWeight : targetWeight / 2.2;
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

const Plates = ({ plates, position } : { plates: OlympicPlate[], position: "l" | "r" }) => {
  const sortRight = (l: OlympicPlate, r: OlympicPlate) => {
    if(l.value > r.value) return -1;
    else if(l.value < r.value) return 1;
    else return 0;
  };

  const sortLeft = (l: OlympicPlate, r: OlympicPlate) => {
    if(l.value > r.value) return 1;
    else if(l.value < r.value) return -1;
    else return 0;
  };

  const sortFunc = position === "l" ? sortLeft : sortRight;

  const sortedPlates : OlympicPlate[] = plates.sort(sortFunc);

  return (
    <Stack direction="horizontal" className={`${position === "l" ? "left-plates" : ""}`} gap={0}>
    {sortedPlates.map((p, ix) => (
      <Plate plate={p} key={ix} />
    ))}
    </Stack>
  );
};

const Plate = ({ plate } : {plate: OlympicPlate}) => {
  return (<div className={`plate ${plate.color} ${plate.value < 10 ? "small" : ""}`}>{plate.name}</div>)
};

export default App
