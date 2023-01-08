from pathlib import Path

import torch
from diffusers import StableDiffusionPipeline
from PIL.Image import Image

token_path = Path('token.txt')
token = token_path.read_text().strip()

pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4")
