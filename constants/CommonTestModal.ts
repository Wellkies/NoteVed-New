//CommonTestModal
import React from 'react';
import Colors from '../assets/Colors';
// import Modal from './modal';
import { Modal } from 'react-native';

export const CommonTestModal = ({testmodalStatus, setTestModalStatus}) => {
  return (
    <Modal
      visible={testmodalStatus}
      heading={`You don't have access to our preminum features ? Please contact our customer service help line !`}
      backgroundColor={Colors.white}
      height={100}
      width={350}
      onpressyes={() => {
        // setSelectedRecord([]);
        setTestModalStatus(false);
      }}
      yesBtnLabel="OK"
      isNoBtnVisible={false}
      // isShowReason={false}
      // reasonval={reason}
      // setReasonval={setReason}
      // onpressyes={() => handledeleteaccount()}
    ></Modal>
  );
};
