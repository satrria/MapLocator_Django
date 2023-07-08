import folium
from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'index.html')

def map(request):
    # Membuat objek peta dengan koordinat pusat dan level zoom
    m = folium.Map(location=[-6.4025, 106.7942], zoom_start=13)

    # Menambahkan penanda (marker) ke peta
    workshop_location1 = [-6.4025, 106.7942]
    workshop_location2 = [-6.3913, 106.7996]

    folium.Marker(location=workshop_location1, popup='Bengkel 1', icon=folium.Icon(icon='wrench', prefix='fa')).add_to(m)
    folium.Marker(location=workshop_location2, popup='Bengkel 2', icon=folium.Icon(icon='wrench', prefix='fa')).add_to(m)

    # Konversi peta menjadi HTML
    map_html = m._repr_html_()

    context = {
        'map_html': map_html
    }

    return render(request, 'map.html', context)