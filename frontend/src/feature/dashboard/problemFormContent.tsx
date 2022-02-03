import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import plLocale from 'date-fns/locale/pl';
import { Roles } from '../../interface/enums';
import { useEffect } from 'react';
import { ProblemData } from '../../interface';
import { BackendRoutes, Routes } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { apsi_backend } from '../common';

const problems = [
  {
    value: 'Service',
    label: 'Service',
  },
  {
    value: 'Bug',
    label: 'Bug',
  },
  {
    value: 'Incident',
    label: 'Incident',
  },
];

const weights = [
  {
    value: 'Minor',
    label: 'Minor',
  },
  {
    value: 'Normal',
    label: 'Normal',
  },
  {
    value: 'Significant',
    label: 'Significant',
  },
  {
    value: 'Blocking',
    label: 'Blocking',
  },
  {
    value: 'Critical',
    label: 'Critical',
  },
];

const urgencies = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
];

const products = [
  {
    value: 'PetApp',
    label: 'PetApp',
  },
  {
    value: 'SmartPet',
    label: 'SmartPet',
  },
];

const components = [
  {
    value: 'Interface',
    label: 'Interface',
  },
  {
    value: 'Database',
    label: 'Database',
  },
];

const statuses = [
  {
    value: 'New',
    label: 'New',
  },
  {
    value: 'Assigned',
    label: 'Assigned',
  },
  {
    value: 'Analyzed',
    label: 'Analyzed',
  },
  {
    value: 'Diagnosed',
    label: 'Diagnosed',
  },
  {
    value: 'Undiagnosed',
    label: 'Undiagnosed',
  },
  {
    value: 'Resolved',
    label: 'Resolved',
  },
  {
    value: 'Unresolved',
    label: 'Unresolved',
  },
];

interface Props {
  role: string;
}

export const ProblemFormContent: React.FC<Props> = ({ role }) => {
  const [comment, setComment] = React.useState<string>('');
  const [disabledFieldsForUserIfNotNewStatuses, setDisabledFieldsForUserIfNotNewStatuses] = React.useState<boolean>(true);
  const [problemData, setProblemData] = React.useState<ProblemData>({
    problemID: 1,
    username: '',
    observers: '',
    problemType: '',
    weight: '',
    urgency: '',
    product: '',
    component: '',
    version: '',
    keywords: '',
    description: '',
    relatedProblems: '',
    proposedDeadline: null,
    status: '',
    responsiblePerson: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProblemData = async () =>
    setProblemData(
      (await apsi_backend.get<ProblemData>(`${BackendRoutes.Problems}/${id}`))
        .data
    );
    if (role === Roles.User && problemData.status === 'new'){
      setDisabledFieldsForUserIfNotNewStatuses(false);
    }
  useEffect(() => {
    fetchProblemData();
  }, []);

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };
  const deleteProblemHandler = () => {
    //TODO: send delete to backend + actualize view + view an information
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //TODO: sendData();
    console.log('aaaa');
    navigate(`../${Routes.Dashboard}`, { replace: true });
  };

  const sendData = async () => {
    // TODO: await axios
    // .post("backend.pl/data", problemData)
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.username = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeObservers = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.observers = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.keywords = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.status = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeRelProblems = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.relatedProblems = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.product = event.target.value;

    if (
      event.target.value === 'SmartPet' &&
      problemData.problemType === 'Bug'
    ) {
      newProblemData.responsiblePerson = 'Jeff Bezos';
    } else if (
      event.target.value === 'PetApp' &&
      problemData.problemType === 'Bug' &&
      problemData.component === 'Interface'
    ) {
      newProblemData.responsiblePerson = 'Steve Jobs';
    } else if (
      event.target.value === 'PetApp' &&
      problemData.problemType === 'Bug' &&
      problemData.component === 'Database'
    ) {
      newProblemData.responsiblePerson = 'Andrzej Duda';
    } else {
      newProblemData.responsiblePerson = '';
    }

    setProblemData(newProblemData);
  };

  const handleChangeComponent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.component = event.target.value;
    if (
      event.target.value === 'Interface' &&
      problemData.product === 'PetApp'
    ) {
      newProblemData.responsiblePerson = 'Steve Jobs';
    } else if (
      event.target.value === 'Database' &&
      problemData.product === 'PetApp'
    ) {
      newProblemData.responsiblePerson = 'Andrzej Duda';
    } else {
      newProblemData.responsiblePerson = '';
    }
    setProblemData(newProblemData);
  };

  const handleChangeVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.version = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.description = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.problemType = event.target.value;
    if (event.target.value === 'Service') {
      newProblemData.responsiblePerson = 'Bill Gates';
    } else if (event.target.value === 'Incident') {
      newProblemData.responsiblePerson = 'Elon Musk';
    } else if (event.target.value === 'Bug') {
      newProblemData.responsiblePerson = '';
    }
    if (problemData.product === 'SmartPet' && event.target.value === 'Bug') {
      newProblemData.responsiblePerson = 'Jeff Bezos';
    } else if (
      problemData.product === 'PetApp' &&
      event.target.value === 'Bug' &&
      problemData.component === 'Interface'
    ) {
      newProblemData.responsiblePerson = 'Steve Jobs';
    } else if (
      problemData.product === 'PetApp' &&
      event.target.value === 'Bug' &&
      problemData.component === 'Database'
    ) {
      newProblemData.responsiblePerson = 'Andrzej Duda';
    }
    setProblemData(newProblemData);
  };

  const handleChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.weight = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeUrgency = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.urgency = event.target.value;
    setProblemData(newProblemData);
  };

  const handleChangeRespPerson = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProblemData: ProblemData = { ...problemData };
    newProblemData.responsiblePerson = event.target.value;
    setProblemData(newProblemData);
  };

  return (
    <>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          disabled
          id="Username"
          label="Username"
          value={problemData.username}
          onChange={handleChangeUser}
        />
        <TextField
          id="Observers"
          label="Observers"
          multiline
          value={problemData.observers}
          onChange={handleChangeObservers}
          helperText="Add problem observers by username"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
          id="problem_type"
          select
          label="Problem type"
          value={problemData.problemType}
          onChange={handleChangeProblem}
        >
          {problems.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
          id="weight"
          select
          label="Weight"
          value={problemData.weight}
          onChange={handleChangeWeight}
        >
          {weights.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
          id="urgency"
          select
          label="Urgency"
          helperText="Select 1 if not urgent or 5 if highly urgent"
          value={problemData.urgency}
          onChange={handleChangeUrgency}
        >
          {urgencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {problemData.problemType === 'Bug' && (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            required
            disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
            select
            id="product"
            label="Product"
            value={problemData.product}
            onChange={handleChangeProduct}
          >
            {products.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {problemData.product === 'PetApp' && (
            <TextField
              select
              required
              disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
              id="component"
              label="Component"
              value={problemData.component}
              onChange={handleChangeComponent}
            >
              {components.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          {problemData.product === 'SmartPet' && (
            <TextField
              id="version"
              required
              disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
              label="Version"
              value={problemData.version}
              onChange={handleChangeVersion}
              placeholder="X.X.X"
              helperText="Add version of product related to the problem"
            />
          )}

          {problemData.product === 'PetApp' && (
            <TextField
              id="version"
              required
              disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
              label="Version"
              value={problemData.version}
              onChange={handleChangeVersion}
              placeholder="X.X.X"
              helperText="Add version of product's component related to the problem"
            />
          )}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
          id="keywords"
          label="Keywords"
          value={problemData.keywords}
          onChange={handleChangeKeywords}
          helperText="Name problem keywords using comma"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
          id="description"
          label="Description"
          multiline
          rows={6}
          value={problemData.description}
          onChange={handleChangeDescription}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
          id="related_problems"
          label="Related problems"
          value={problemData.relatedProblems}
          onChange={handleChangeRelProblems}
          helperText="Add related problems by problem ID "
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
          <DatePicker
            disablePast
            disabled={role === Roles.Admin || disabledFieldsForUserIfNotNewStatuses === true}
            label="Proposed deadline"
            openTo="year"
            mask="__.__.____"
            views={['day']}
            value={problemData.proposedDeadline}
            onChange={(newValue) => {
              const newProblemData: ProblemData = { ...problemData };
              if (newValue) newProblemData.proposedDeadline = newValue;
              setProblemData(newProblemData);
            }}
            renderInput={(params) => (
              <TextField helperText="dd.mm.yyyy" {...params} />
            )}
          />
        </LocalizationProvider>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <TextField
          required
          select
          disabled={role === Roles.User}
          id="status"
          label="Status"
          value={problemData.status}
          onChange={handleChangeStatus}
        >
          {statuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          disabled={role === Roles.User}
          id="responsible_person"
          label="Responsible person"
          value={problemData.responsiblePerson}
          onChange={handleChangeRespPerson}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <TextField
        sx={{ mt: 3, width: '100%' }}
        id="comment"
        label="Comment"
        multiline
        rows={4}
        value={comment}
        onChange={handleComment}
      />
    </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          size="medium"
          type="submit"
          sx={{
            fontSize: 20,
            margin: 0.5,
            marginTop: 3,
            padding: 1,
            width: '20%',
          }}
        >
          Submit changes
        </Button>
        <Button
        variant="contained"
        size="medium"
        sx={{
          fontSize: 20,
          margin: 0.5,
          marginTop: 3,
          padding: 1,
          width: '20%',
        }}
        onClick={deleteProblemHandler}
      >
        Delete issue
      </Button>
      </div>
    </Box>
</>
  );
};
