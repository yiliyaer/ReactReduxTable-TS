import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { MDBDataTable, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCardBody, MDBCardHeader, MDBCard } from 'mdbreact';

import { connect, RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../store';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function CustomDataTable() {
  const classes = useStyles();
  // get data table from redux store
  const dataTable = useSelector((state: RootStateOrAny) => state.dataTable);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalID, setModalID] = useState(0);
  const [modalContext, setModalContext] = useState({ columns:[{}], rows:[{}]});
  const { retrieveData } = bindActionCreators(actions, dispatch);

  const showModal = false;
  useEffect(() => {
    dispatch(retrieveData);
  }, []);

  useEffect(() => {
    setModal(showModal);
  });


  const handleClick = (id) => {

    return axios.get('https://jsonplaceholder.typicode.com/posts?userId='+ id) 
    .then(function (response) {
      const contextData = {
        columns: [
          {
            label: 'Title',
            field: 'title',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Body',
            field: 'body',
            sort: 'asc',
            width: 150
          }
        ],
        rows: filteredModalData(response.data)
      };

      console.log(contextData);
      setModalContext( contextData );
      setModal(true);
    });
  }

  const filteredModalData = (data) => {
    let filtered: object[] = [];
    for (let item of data) {
      if (item) {
        let filteredObj = {
          title: item?.title,
          body: item?.body
        }

        filtered.push(filteredObj);
      }
    }
    //async
    return filtered;
  }
  const filterResult = () => {
    let filtered: object[] = [];
    for (let item of dataTable) {
      if (item) {
        let filteredObj = {
          name: item?.name,
          email: item?.email,
          city: item?.address?.city,
          company: item?.company?.name,
          post: <button onClick={ ()=>handleClick(item.id)}>Posts</button>,
          // clickEvent: () => handleClick(item.id, showModal)
        };

        filtered.push(filteredObj);
      }
    }
    //async
    return filtered;
  }

  const state = {
    modal: false
  }
  
  const toggle = () => {
    setModal(!modal)
  }

  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 150
      },
      {
        label: 'City',
        field: 'city',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Company',
        field: 'company',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Post',
        field: 'post',
        sort: 'asc',
        width: 150
      }
    ],
    rows: filterResult()
  };

  return (<>

    <MDBCard>
      <MDBCardHeader tag="h3" className="text-center font-weight-bold text-uppercase py-4">
        PVC table
      </MDBCardHeader>
      <MDBCardBody>
        <MDBDataTable
          striped
          bordered
          small
          data={data}
        />
 

        <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalBody>
        <MDBDataTable
          striped
          bordered
          small
          data={modalContext}
        />
        </MDBModalBody>
        <MDBModalFooter>
          <button color="secondary" onClick={toggle}>Close</button>
        </MDBModalFooter>
      </MDBModal>
      </MDBCardBody>
    </MDBCard>

  </>
  );
}

const mapStateToProps = state => {
  return {
    dataTable: state.dataTable
  };
}


export default connect(mapStateToProps)(CustomDataTable);


