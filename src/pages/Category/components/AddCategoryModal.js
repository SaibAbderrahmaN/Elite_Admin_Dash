import React from 'react';
import Input from '../../../componets/UI/Input/Input';
import Modal from '../../../componets/UI/Modal/index';
import { Row, Col } from 'react-bootstrap';


const AddCategoryModal = (props) => {

    const { show, handleClose, modalTitle, categoryName, setCategoryName,categoryHours, setCategoryHours,categoryLanguage, setCategoryLanguage, parentCategoryId, setParentCategoryId, categoryList, handleCategoryImage, onSubmit} = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                       <Input
                        value={categoryHours}
                        placeholder={`Category Hours`}
                        onChange={(e) => setCategoryHours(e.target.value)}
                        className="form-control-sm"
                    />
                       <Input
                        value={categoryLanguage}
                        placeholder={`Category Language`}
                        onChange={(e) => setCategoryLanguage(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select
                        className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row><Col><input type="file" name="categoryImage" onChange={handleCategoryImage} /></Col></Row>


        </Modal>
    );
}

export default AddCategoryModal;