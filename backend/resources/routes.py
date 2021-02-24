from .auth import SignupApi, LoginApi
from .users import UserApi
from .order import OrdersApi, OrderApi
from .reset_password import ForgotPassword, ResetPassword
from .contact import  Contact

def initialize_routes(api):

    api.add_resource(SignupApi, '/api/auth/signup')
    api.add_resource(LoginApi, '/api/auth/login')

    api.add_resource(ForgotPassword, '/api/auth/forgot')
    api.add_resource(ResetPassword, '/api/auth/reset')

    api.add_resource(UserApi, '/api/user/<id>')

    api.add_resource(OrdersApi, '/api/orders')
    api.add_resource(OrderApi, '/api/orders/<id>')

    api.add_resource(Contact, '/api/contact')


