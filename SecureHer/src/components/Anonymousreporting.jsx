import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Anonymousreporting = () => {
  const [showNameField, setShowNameField] = useState(false);

  const reportSchema = yup.object().shape({
    reportType: yup
      .string()
      .required('Report type is required'),
    name: yup
      .string()
      .when('reportType', {
        is: 'other',
        then: yup.string().required('Name is required when selecting "Other"'),
      }),
    incidentDetails: yup
      .string()
      .min(10, 'Incident details must be at least 10 characters')
      .required('Incident details are required'),
    location: yup
      .string()
      .required('Location is required'),
    reportingMethod: yup
      .string()
      .required('Reporting method is required'),
  });

  const formik = useFormik({
    initialValues: { reportType: '', name: '', incidentDetails: '', location: '', reportingMethod: 'anonymous' },
    validationSchema: reportSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Report Submitted:', values);
      alert('✅ Report submitted successfully. Thank you for helping to keep the community safe.');
      resetForm();
      setShowNameField(false);
    },
  });

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-red-800 mb-6">📝 Reporting</h2>
      <form onSubmit={formik.handleSubmit} className="w-3/4 bg-white p-6 rounded-2xl shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-900 font-medium">Report Type</label>
          <input
            type="text"
            className={`w-full p-4 border-2 rounded-lg focus:outline-none ${formik.errors.reportType && formik.touched.reportType ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Select report type"
            name="reportType"
            value={formik.values.reportType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.reportType && formik.touched.reportType && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.reportType}</p>
          )}
        </div>

        {showNameField && (
          <div className="mb-4">
            <label className="block text-gray-900 font-medium">Your Name</label>
            <input
              type="text"
              className={`w-full p-4 border-2 rounded-lg focus:outline-none ${formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-900 font-medium">Incident Details</label>
          <textarea
            className={`w-full p-4 border-2 rounded-lg focus:outline-none ${formik.errors.incidentDetails && formik.touched.incidentDetails ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Describe the incident in detail..."
            name="incidentDetails"
            value={formik.values.incidentDetails}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows="3"
          />
          {formik.errors.incidentDetails && formik.touched.incidentDetails && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.incidentDetails}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-900 font-medium">Location</label>
          <input
            type="text"
            className={`w-full p-4 border-2 rounded-lg focus:outline-none ${formik.errors.location && formik.touched.location ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter the location of the incident"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.location && formik.touched.location && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.location}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="reportingMethod"
                value="anonymous"
                checked={formik.values.reportingMethod === 'anonymous'}
                onChange={formik.handleChange}
              />
              
              <span className="ml-2">Anonymous</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="reportingMethod"
                value="other"
                checked={formik.values.reportingMethod === 'other'}
                onChange={formik.handleChange}
              />
              <span className="ml-2">Others</span>
            </label>
          </div>
          {formik.errors.reportingMethod && formik.touched.reportingMethod && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.reportingMethod}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow-lg hover:bg-red-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default Anonymousreporting;
