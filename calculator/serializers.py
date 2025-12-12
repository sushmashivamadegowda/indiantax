from rest_framework import serializers


class TaxCalculationSerializer(serializers.Serializer):
    """
    Serializer for tax calculation input validation
    """
    salary = serializers.FloatField(min_value=0, required=True)
    hra = serializers.FloatField(min_value=0, default=0)
    lta = serializers.FloatField(min_value=0, default=0)
    deduction80C = serializers.FloatField(min_value=0, default=0)
    deduction80D = serializers.FloatField(min_value=0, default=0)
    age = serializers.ChoiceField(
        choices=['below60', '60to80', 'above80'],
        default='below60'
    )
    
    def validate(self, data):
        """
        Validate deduction limits
        """
        # Section 80C limit is 1.5L
        if data.get('deduction80C', 0) > 150000:
            raise serializers.ValidationError({
                'deduction80C': 'Section 80C deduction cannot exceed ₹1,50,000'
            })
        
        # Section 80D limit varies by age
        age = data.get('age', 'below60')
        max_80D = 25000 if age == 'below60' else 50000
        if data.get('deduction80D', 0) > max_80D:
            raise serializers.ValidationError({
                'deduction80D': f'Section 80D deduction cannot exceed ₹{max_80D:,} for {age}'
            })
        
        return data