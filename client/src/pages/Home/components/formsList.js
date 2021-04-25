import { List, Typography } from 'antd'
import {useQuery} from '@apollo/client'

import { FORMS_QUERY } from '../../../graphql/queries/form'
import { ListItem } from './listItem'

const {Title} = Typography

export const FormsList = () => {
    const {loading, data: {getForms: forms} = {}} = useQuery(FORMS_QUERY)

    return (
        <List
            header={<Title level={3}>Your forms</Title>}
            size="large"
            dataSource={forms}
            locale={{emptyText: `You haven't created any form yet`}}
            renderItem={form => 
                <ListItem key={form.id} form={form} loading={loading}/>   
            }
        />
    )
}
