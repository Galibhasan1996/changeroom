// screens/GenericDetailScreen.js
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useAuth } from '../../Hook/Auth/useAuth';
import { formatDate, styleConsole } from '../../util/helper/Helper';
import { UserStorage } from '../../store/Store';
import DetailScreen from '../../Component/DetailScreen/DetailScreen';
import { getLokerById } from '../../service/api/login/UserLogin';
const GenericDetailScreen = () => {
    const route = useRoute();
    const { item = {}, type } = route.params || {};
    // console.log("🚀 ~ GenericDetailScreen.js:11 ~ GenericDetailScreen ~ type:", type)



    const { preGetById, adminGetById, preAdminGetById } = useAuth();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const token = UserStorage.getItem("token");


    const [data, setData] = useState({});
    // styleConsole("🚀 ~ GenericDetailScreen.js:20 ~ GenericDetailScreen ~ data:", "GenericDetailScreen", data)


    const fetchDataByType = async () => {
        try {
            let response;
            switch (type) {
                case 'allLocker':
                    const { locker } = await getLokerById(item?._id, token);
                    response = { data: locker }

                    break;
                case 'preLocker':
                    const res = await preGetById(item._id);
                    response = { data: res.data };
                    break;

                case 'admin':
                    const { isExist } = await adminGetById(item._id);
                    response = { data: isExist };
                    break;
                case "preAdmin":
                    const { locker: preLocker } = await preAdminGetById(item._id)
                    response = { data: preLocker }
                    // styleConsole("🚀 ~ GenericDetailScreen.js:47 ~ fetchDataByType ~ data:", "preAdmin", response)
                    break

                default:
                    console.warn('Invalid type:', type);
                    return;
            }

            if (response?.data) {
                setData(response.data);
            }
        } catch (error) {
            console.log("🚀 ~ GenericDetailScreen.js:45 ~ fetchDataByType ~ error:", error)
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (item._id) fetchDataByType();
        }, [item, type])
    );


    const details = useMemo(() => {
        switch (type) {
            case 'allLocker':
                return [
                    { label: "Sr.No.", value: data?.sr_no || "N/A" },
                    { label: "Name", value: data?.name || "N/A" },
                    { label: "Locker No", value: data?.locker_no || "N/A" },
                    { label: "Unit", value: data?.unit || "N/A" },
                    { label: "Code", value: data?.code || "N/A" },
                    { label: "Location", value: data?.location || "N/A" },
                    { label: "Role", value: data?.role || "N/A" },
                    { label: "Status", value: data?.status || "N/A" },
                    { label: "Mobile", value: data?.mobile || "N/A" },
                    { label: "Department", value: data?.department || "N/A" },
                    { label: "Combine", value: data?.combine || "N/A" },
                    { label: "Aadhar", value: data?.aadhar || "N/A" },
                    { label: "Address", value: data?.address || "N/A" },
                    { label: "Shoe Size", value: data?.shoe_size || "N/A" },
                    { label: "Date & Time", value: formatDate(data?.updatedAt) || "N/A" },
                ];

            case 'preLocker':
                return [
                    { label: "Sr.No.", value: data?.sr_no || "N/A" },
                    { label: "Name", value: data?.name || "N/A" },
                    { label: "Locker No", value: data?.locker_no || "N/A" },
                    { label: "Unit", value: data?.unit || "N/A" },
                    { label: "Code", value: data?.code || "N/A" },
                    { label: "Location", value: data?.location || "N/A" },
                    { label: "Role", value: data?.role || "N/A" },
                    { label: "Status", value: data?.status || "N/A" },
                    { label: "Mobile", value: data?.mobile || "N/A" },
                    { label: "Department", value: data?.department || "N/A" },
                    { label: "Combine", value: data?.combine || "N/A" },
                    { label: "Aadhar", value: data?.aadhar || "N/A" },
                    { label: "Address", value: data?.address || "N/A" },
                    { label: "Shoe Size", value: data?.shoe_size || "N/A" },
                    { label: "Date & Time", value: formatDate(data?.updatedAt) || "N/A" },
                ];
            case 'admin':
                return [
                    { label: "Sr.No.", value: data?.sr_no || "N/A" },
                    { label: "Name", value: data?.name || "N/A" },
                    { label: "Locker No", value: data?.locker_no || "N/A" },
                    { label: "Code", value: data?.code || "N/A" },
                    { label: "Status", value: data?.status || "N/A" },
                    { label: "Mobile", value: data?.mobile || "N/A" },
                    { label: "Department", value: data?.department || "N/A" },
                    { label: "Shoe Size", value: data?.shoe_size || "N/A" },
                    { label: "Before", value: data?.before || "N/A" },
                    { label: "Date & Time", value: formatDate(data?.updatedAt) || "N/A" },
                ];

            case 'preAdmin':
                return [
                    { label: "Sr.No.", value: data?.sr_no || "N/A" },
                    { label: "Name", value: data?.name || "N/A" },
                    { label: "Locker No", value: data?.locker_no || "N/A" },
                    { label: "Code", value: data?.code || "N/A" },
                    { label: "Status", value: data?.status || "N/A" },
                    { label: "Mobile", value: data?.mobile || "N/A" },
                    { label: "Department", value: data?.department || "N/A" },
                    { label: "Shoe Size", value: data?.shoe_size || "N/A" },
                    { label: "Before", value: data?.before || "N/A" },
                    { label: "Date & Time", value: formatDate(data?.updatedAt) || "N/A" },
                ];

            default:
                return [];
        }
    }, [type, data]);

    return <DetailScreen image={data?.image?.url} details={details} isLeft={data?.isLeft} data={data} type={type} />;
};

export default GenericDetailScreen;


