import { FormRow, FormRowSelect, SubmitButton } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const editJobQuery = (id) => {
  return {
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(editJobQuery(params.id));
      return { id: params.id };
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { id } = params;

    try {
      await customFetch.patch(`/jobs/${id}`, data);
      queryClient.invalidateQueries();
      toast.success("job edited successfully");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditJob = () => {
  const { id } = useLoaderData();
  const {
    data: { job },
  } = useQuery(editJobQuery(id));

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            list={Object.values(JOB_STATUS)}
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
          />
          <FormRowSelect
            list={Object.values(JOB_TYPE)}
            name="jobType"
            labelText="job type"
            defaultValue={job.type}
          />
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
