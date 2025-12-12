from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import TaxCalculationSerializer
from .utils import calculate_tax


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
        
        # Calculate tax
        result = calculate_tax(
            salary=salary,
            hra=hra,
            lta=lta,
            deduction80C=deduction80C,
            deduction80D=deduction80D,
            age=age
        )
        
        return Response(result, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
