from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import TaxCalculationSerializer
from .utils import calculate_tax


@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, password=password)
    token, _ = Token.objects.get_or_create(user=user)
    
    return Response({
        'token': token.key,
        'user_id': user.pk,
        'username': user.username
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if not user:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_404_NOT_FOUND)
        
    token, _ = Token.objects.get_or_create(user=user)
    
    return Response({
        'token': token.key,
        'user_id': user.pk,
        'username': user.username
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def calculate_tax_view(request):
    """
    API endpoint to calculate Indian Income Tax
    POST /api/calculate-tax/
    """
    serializer = TaxCalculationSerializer(data=request.data)
    
    if serializer.is_valid():
        data = serializer.validated_data
        
        # Extract validated data
        salary = data['salary']
        hra = data.get('hra', 0)
        lta = data.get('lta', 0)
        deduction80C = data.get('deduction80C', 0)
        deduction80D = data.get('deduction80D', 0)
        age = data.get('age', 'below60')
        financial_year = request.data.get('financial_year', '2024-2025')
        
        # Calculate tax
        result = calculate_tax(
            salary=salary,
            hra=hra,
            lta=lta,
            deduction80C=deduction80C,
            deduction80D=deduction80D,
            age=age,
            financial_year=financial_year
        )
        
        return Response(result, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def calculate_hra_view(request):
    """POST /api/calculate-hra/"""
    try:
        basic = float(request.data.get('basic', 0))
        hra = float(request.data.get('hra', 0))
        rent = float(request.data.get('rent', 0))
        city = request.data.get('city', 'non-metro')
        
        from .utils import calculate_hra_exemption
        result = calculate_hra_exemption(basic, hra, rent, city)
        return Response(result)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def calculate_advance_tax_view(request):
    """POST /api/calculate-advance-tax/"""
    try:
        liability = float(request.data.get('tax_liability', 0))
        
        from .utils import calculate_advance_tax
        result = calculate_advance_tax(liability)
        return Response(result)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def calculate_tds_view(request):
    """POST /api/calculate-tds/"""
    try:
        salary = float(request.data.get('salary', 0))
        investments = float(request.data.get('investments', 0))
        
        from .utils import calculate_tds
        result = calculate_tds(salary, investments)
        return Response(result)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def calculate_80c_view(request):
    """POST /api/calculate-80c/"""
    try:
        invested = float(request.data.get('invested', 0))
        
        from .utils import calculate_80c_suggestions
        result = calculate_80c_suggestions(invested)
        return Response(result)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def calculate_salary_breakdown_view(request):
    """POST /api/calculate-salary-breakdown/"""
    try:
        ctc = float(request.data.get('ctc', 0))
        
        from .utils import calculate_salary_breakdown
        result = calculate_salary_breakdown(ctc)
        return Response(result)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def calculate_composition_scheme_view(request):
    """POST /api/calculate-composition-scheme/"""
    try:
        turnover = float(request.data.get('turnover', 0))
        business_type = request.data.get('business_type', 'trader')
        
        from .utils import calculate_composition_tax
        result = calculate_composition_tax(turnover, business_type)
        return Response(result)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def chat_view(request):
    """POST /api/chat/"""
    try:
        query = request.data.get('message', '')
        if not query:
            return Response({'response': "Please say something!"})
            
        from .utils import get_bot_response
        response_text = get_bot_response(query)
        
        return Response({'response': response_text})
    except Exception as e:
        return Response({'error': str(e)}, status=400)
