from sqlalchemy.sql import text

def getDefault(parameters, obj):
    if ('orderBy' or 'orderType') not in parameters:
        order = obj.id.asc()
    else:
        try:
            if parameters['orderType'] in ['desc', 'asc'] and parameters['orderBy'] in obj.__table__.columns:
                order = text(f"{obj.__tablename__}.{parameters['orderBy']} {parameters['orderType']}")
            else:
                order = obj.id.asc()
        except:
            order = obj.id.asc()
    if 'limit' not in parameters:
        limit = 10
    else:
        try:
            limit = int(parameters['limit'])
        except:
            limit = 10
    if 'page' not in parameters:
        page = 1
    else:
        try:
            page = int(parameters['page'])
        except:
            page = 1
    offset = (page - 1) * limit
    return limit, page, offset, order


def get_data_with_page(data, page_limit, current_page, total):
    result = {'data': data, 'paging': {'total_count': total}}

    if int(result['paging']['total_count']) % int(page_limit) == 0:
        total_page = int(result['paging']['total_count'])//int(page_limit)
    else:
        total_page = (int(result['paging']['total_count'])//int(page_limit)) + 1

    if current_page < total_page:
        result['paging']['records_in_page'] = page_limit
    elif current_page == total_page:
        result['paging']['records_in_page'] = int(result['paging']['total_count']) - (int(current_page) - 1) * page_limit
    else:
        result['paging']['records_in_page'] = 0

    result['paging']['total_page'] = total_page
    result['paging']['current_page'] = int(current_page)

    return result